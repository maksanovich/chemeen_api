import { Request, Response } from 'express';
import { QueryTypes } from 'sequelize';
import * as pdf from 'html-pdf';
import * as fs from 'fs';
import * as path from 'path';
import * as Handlebars from 'handlebars';
import { format } from "date-fns";
const phantomjs = require('phantomjs-prebuilt');

import sequelize from '../../config/sequelize';
import { amount2word } from '../../common/utils';

export const exportPIPDF = async (req: Request, res: Response): Promise<void> => {
    const id: string = req.params.id;
    try {
        const piData: any = await getPI(id);
        piData.shipDate = formatDate(piData.shipDate);

        let itemData: any = await getItem(id);
        itemData = await Promise.all(itemData.map(async (item: any) => {
            const itemDetailData = await getItemDetail(item.ItemId);
            item.details = itemDetailData;
            return item;
        }));

        piData.items = itemData;

        let totalCartons = 0;
        let totalKgQty = 0;
        let totalAmount = 0;

        itemData.forEach((item: any) => {
            item.details.forEach((detail: any) => {
                totalCartons += parseFloat(detail.cartons) || 0;
                totalKgQty += parseFloat(detail.kgQty) || 0;
                totalAmount += parseFloat(detail.usdAmount) || 0;
            });
        });

        piData.totalCartons = totalCartons;
        piData.totalKgQty = totalKgQty.toFixed(2);
        piData.totalAmount = totalAmount.toFixed(2);
        piData.totalGrossQty = (totalCartons * 17).toFixed(2);

        piData.amountsWord = amount2word(totalAmount);

        if (!piData) {
            res.status(404).send("PI not found");
            return;
        }

        const piTemplatePath = path.join(__dirname, '../../templates/pi-template.html');
        const piResult: any = await generatePDF(piTemplatePath, piData);

        if (!piResult.success) {
            res.status(500).send('Error generating PI PDF');
            return;
        }


        const fileName = `PI-${piData.PINo}-${piData.PIDate}.pdf`;
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `inline; filename="${fileName}"`);
        res.setHeader('Content-Length', piResult.data.length);
        res.send(piResult.data);

    } catch (e) {
        console.error('Export PDF error:', e);
        res.status(500).send(e);
    }
}

export const exportCodeListPDF = async (req: Request, res: Response): Promise<void> => {
    const id: string = req.params.id;
    try {
        const [piData, codeListData] = await Promise.all([getPI(id), getCodeList(id)]);
        const products = groupCodeListByProduct(codeListData, piData);
        // Get createdAt from PI data
        const createdAt = (piData as any).createdAt ? format(new Date((piData as any).createdAt), "dd/MM/yyyy") : '';

        const templateData = {
            createdAt,
            products
        };
        const templatePath = path.join(__dirname, '../../templates/codelist-template.html');
        const result: any = await generatePDF(templatePath, templateData);

        if (result.success) {
            const buffer = result.data;
            const fileName = `CodeList-${(piData as any).PINo}-${new Date().toISOString().split('T')[0]}.pdf`;
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', `inline; filename="${fileName}"`);
            res.setHeader('Content-Length', buffer.length);
            res.send(buffer);
        } else {
            res.status(500).send('Error generating Code List PDF');
        }
    } catch (e) {
        console.error('Export Code List PDF error:', e);
        res.status(500).send(e);
    }
}

interface CodeEntry {
    code: string;
    farmId: string;
    ageCategories: Map<string, number>;
}

interface ProductData {
    exporterName: string;
    variety: string;
    typeOfPacks: string;
    piNo: string;
    buyer: string;
    codesMap: Map<string, CodeEntry>;
}

interface ProductOutput {
    processorCode: string;
    exporterName: string;
    variety: string;
    typeOfPacks: string;
    piNo: string;
    buyer: string;
    ageCategories: string[];
    codes: any[];
    productTotals: number[];
    scaleTotals: number[];
    grandTotal: number;
    grandTotalScale: number;
    sampleScale: string;
}

const calculateScale = (value: number): number => {
    return value === 0 ? 0 : Math.round((Math.sqrt(value) + 1) / 2);
};

const groupCodeListByProduct = (codeListData: any[], piData: any): ProductOutput[] => {
    const productsMap = new Map<string | number, ProductData>();

    for (const item of codeListData) {
        const productKey = item.ItemId || `${item.PRSName}_${item.PRSTName}`;
        
        if (!productsMap.has(productKey)) {
            productsMap.set(productKey, {
                exporterName: piData.ecName || "M/S.GAYATRI AQUA PRODUCTS PRIVATE LIMITED",
                variety: `${piData.pcCountry} ${item.PRSTName} ${item.PRSName}`,
                typeOfPacks: `${item.PRSPPiece} X ${item.PRSPWeight}${item.PRSPWUnit}`,
                piNo: piData.PONumber || "KRS-9017",
                buyer: piData.ccName || "MATSUOKA CO. LTD.,",
                codesMap: new Map<string, CodeEntry>()
            });
        }

        const product = productsMap.get(productKey)!;
        const codeKey = `${item.code}_${item.farmName}`;

        if (!product.codesMap.has(codeKey)) {
            product.codesMap.set(codeKey, {
                code: item.code,
                farmId: item.farmName,
                ageCategories: new Map<string, number>()
            });
        }

        if (item.PRSGDesc) {
            const codeEntry = product.codesMap.get(codeKey)!;
            const value = parseFloat(item.value) || 0;
            const currentValue = codeEntry.ageCategories.get(item.PRSGDesc) || 0;
            codeEntry.ageCategories.set(item.PRSGDesc, currentValue + value);
        }
    }

    return Array.from(productsMap.values()).map(product => {
        const codes = Array.from(product.codesMap.values());

        const ageCategoriesSet = new Set<string>();
        codes.forEach(code => {
            code.ageCategories.forEach((value, category) => {
                if (value > 0) ageCategoriesSet.add(category);
            });
        });
        const sortedAgeCategories = Array.from(ageCategoriesSet).sort();

        const transformedCodes = codes.map(codeEntry => {
            const values = sortedAgeCategories.map(cat => codeEntry.ageCategories.get(cat) || 0);
            const scales = values.map(calculateScale);
            const total = values.reduce((sum, v) => sum + v, 0);
            const totalScale = scales.reduce((sum, v) => sum + v, 0);

            return {
                code: codeEntry.code,
                farmId: codeEntry.farmId,
                ageCategoryValues: values,
                ageCategoryScale: scales,
                total,
                totalScale
            };
        });

        const productTotals = sortedAgeCategories.map(category =>
            codes.reduce((sum, code) => sum + (code.ageCategories.get(category) || 0), 0)
        );
        const scaleTotals = sortedAgeCategories.map(category =>
            codes.reduce((sum, code) => sum + calculateScale(code.ageCategories.get(category) || 0), 0)
        );
        const grandTotal = productTotals.reduce((sum, v) => sum + v, 0);
        const grandTotalScale = scaleTotals.reduce((sum, v) => sum + v, 0);

        // Get createdAt from PI data
        const createdAt = (piData as any).createdAt 
            ? format(new Date((piData as any).createdAt), "dd/MM/yyyy") 
            : '';

        return {
            processorCode: piData.pcApprovalNo,
            exporterName: product.exporterName,
            variety: product.variety,
            typeOfPacks: product.typeOfPacks,
            piNo: product.piNo,
            buyer: product.buyer,
            ageCategories: sortedAgeCategories,
            codes: transformedCodes,
            productTotals,
            scaleTotals,
            grandTotal,
            grandTotalScale,
            sampleScale: `${grandTotal} + 1/2 = 20MCS`,
            createdAt
        };
    });
};

export const exportTraceabilityPDF = async (req: Request, res: Response): Promise<void> => {
    const id: string = req.params.id;
    try {
        const piData: any = await getPI(id);
        const traceabilityData: any = await getTraceability(id);
        const results = await Promise.all(
            traceabilityData.map(async (item: any) => {
                const details = await getItemDetail(item.ItemId);


                const grade = details.map((d: any) => d.size).join(",   ");
                const farm: any = await getFarm(item.code);

                return {
                    ...item,
                    grade: grade,
                    farmName: farm[0] ? farm[0].farmName : "Farm Name"
                };
            })
        );

        const products = transformProducts(results, piData);
        // Get createdAt from PI data
        const createdAt = piData.createdAt ? format(new Date(piData.createdAt), "dd/MM/yyyy") : '';
        const templateData = {
            processorCode: piData.pcApprovalNo,
            processorName: piData.pcName,
            exporterName: piData.ecName || "M/S.GAYATRI AQUA PRODUCTS PRIVATE LIMITED",
            poNumber: piData.PONumber || "KRS-9017",
            buyerName: piData.ccName || "MATSUOKA CO. LTD.,",
            createdAt,
            products: products
        };

        const templatePath = path.join(__dirname, '../../templates/traceability-template.html');
        const result: any = await generatePDF(templatePath, templateData);
        if (result.success) {
            const buffer = result.data;
            const fileName = `Traceability-${piData.PINo || 'Report'}-${new Date().toISOString().split('T')[0]}.pdf`;
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', `inline; filename="${fileName}"`);
            res.setHeader('Content-Length', buffer.length);
            res.send(buffer);
        } else {
            res.status(500).send('Error generating Traceability PDF');
        }
    } catch (e) {
        console.error('Export Traceability PDF error:', e);
        res.status(500).send(e);
    }
}

export const exportBacteriologicalPDF = async (req: Request, res: Response): Promise<void> => {
    const id: string = req.params.id;
    try {
        const piData: any = await getPI(id);
        const BARData: any = await getBAR(id);
        const results = await Promise.all(
            BARData.map(async (item: any) => {

                const details = await getItemDetail(item.ItemId);
                const grade = details
                    .filter((d: any) => d.cartons && parseFloat(d.cartons) > 0)
                    .map((d: any) => d.size)
                    .join(",   ");
                const farm: any = await getFarm(item.code);

                return {
                    ...item,
                    grade: grade,
                    farmName: farm[0] ? farm[0].farmName : "Farm Name"
                };
            })
        );

        const templateData = transformBARProducts(results, piData);
        templateData.approvalNo = piData.pcApprovalNo
        const templatePath = path.join(__dirname, '../../templates/bacteriological-template.html');
        const result: any = await generatePDF(templatePath, templateData);

        if (result.success) {
            const buffer = result.data;
            const fileName = `Bacteriological-${piData.PINo || 'Report'}-${new Date().toISOString().split('T')[0]}.pdf`;
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', `inline; filename="${fileName}"`);
            res.setHeader('Content-Length', buffer.length);
            res.send(buffer);
        } else {
            res.status(500).send('Error generating Bacteriological Analysis PDF');
        }
    } catch (e) {
        console.error('Export Bacteriological PDF error:', e);
        res.status(500).send(e);
    }
}

export const exportAllPDFs = async (req: Request, res: Response): Promise<void> => {
    const id: string = req.params.id;
    try {
        const [piResult, codeListResult, traceabilityResult, bacteriologicalResult] = await Promise.all([
            generatePIPDF(id),
            generateCodeListPDF(id),
            generateTraceabilityPDF(id),
            generateBacteriologicalPDF(id)
        ]);

        res.json({
            success: true,
            data: {
                pi: piResult.success && piResult.data ? piResult.data.toString('base64') : null,
                codeList: codeListResult.success && codeListResult.data ? codeListResult.data.toString('base64') : null,
                traceability: traceabilityResult.success && traceabilityResult.data ? traceabilityResult.data.toString('base64') : null,
                bar: bacteriologicalResult.success && bacteriologicalResult.data ? bacteriologicalResult.data.toString('base64') : null
            }
        });
    } catch (e) {
        console.error('Export All PDFs error:', e);
        res.status(500).json({ success: false, error: e instanceof Error ? e.message : 'Unknown error' });
    }
}

const generatePDF = (templatePath: string, data: any): Promise<{ success: boolean; data?: Buffer }> => {
    const htmlTemplate = fs.readFileSync(templatePath, 'utf8');

    Handlebars.registerHelper('times', function (n: number, block: any) {
        let accum = '';
        for (let i = 0; i < n; ++i) {
            accum += block.fn(i);
        }
        return accum;
    });

    Handlebars.registerHelper('subtract', function (a: number, b: number) {
        return a - b;
    });

    const template = Handlebars.compile(htmlTemplate);

    const html = template(data);

    return new Promise((resolve, reject) => {
        // Get PhantomJS binary path
        let phantomPath: string;
        try {
            phantomPath = phantomjs.path;
        } catch (e) {
            // Fallback: construct path manually
            const phantomjsModulePath = require.resolve('phantomjs-prebuilt');
            const phantomjsDir = path.dirname(phantomjsModulePath);
            phantomPath = path.join(phantomjsDir, 'bin', 'phantomjs');
        }
        
        pdf.create(html, {
            phantomPath: phantomPath
        }).toBuffer((err: any, buffer: Buffer) => {
            if (err) {
                console.error('PDF generation error:', err);
                console.error('PhantomJS path used:', phantomPath);
                return resolve({ success: false });
            }
            resolve({ success: true, data: buffer });
        });
    });
};

const generatePIPDF = async (id: string): Promise<{ success: boolean; data?: Buffer }> => {
    try {
        const piData: any = await getPI(id);
        piData.shipDate = formatDate(piData.shipDate);

        let itemData: any = await getItem(id);
        itemData = await Promise.all(itemData.map(async (item: any) => {
            const itemDetailData = await getItemDetail(item.ItemId);
            item.details = itemDetailData;
            return item;
        }));

        piData.items = itemData;

        let totalCartons = 0;
        let totalKgQty = 0;
        let totalAmount = 0;

        itemData.forEach((item: any) => {
            item.details.forEach((detail: any) => {
                totalCartons += parseFloat(detail.cartons) || 0;
                totalKgQty += parseFloat(detail.kgQty) || 0;
                totalAmount += parseFloat(detail.usdAmount) || 0;
            });
        });

        piData.totalCartons = totalCartons;
        piData.totalKgQty = totalKgQty.toFixed(2);
        piData.totalAmount = totalAmount.toFixed(2);
        piData.totalGrossQty = (totalCartons * 17).toFixed(2);

        piData.amountsWord = amount2word(piData.totalAmount);

        const piTemplatePath = path.join(__dirname, '../../templates/pi-template.html');
        return await generatePDF(piTemplatePath, piData);
    } catch (e) {
        console.error('Generate PI PDF error:', e);
        return { success: false };
    }
};

const generateCodeListPDF = async (id: string): Promise<{ success: boolean; data?: Buffer }> => {
    try {
        const piData: any = await getPI(id);
        const codeListData: any = await getCodeList(id);

        const grouped = Object.values(
            codeListData.reduce((acc: any, item: any) => {
                const key = `${item.code}_${item.PRSName}_${item.PRSTName}`;

                if (!acc[key]) {
                    acc[key] = {
                        code: item.code,
                        PRSName: item.PRSName,
                        PRSTName: item.PRSTName,
                        PRSPWSStyle: item.PRSPWSStyle,
                        PRSPPiece: item.PRSPPiece,
                        PRSPWeight: item.PRSPWeight,
                        data: []
                    };
                }

                acc[key].data.push({
                    value: item.value,
                    PRSGDesc: item.PRSGDesc
                });

                return acc;
            }, {} as any)
        );

        const templateData: any = {
            companyName: piData.ecName,
            companyAddress: piData.ecAddress,
            consigneeName: piData.ccName,
            invoiceNumber: piData.PINo,
            invoiceDate: piData.PIDate,
            certificateNumber: "QC-2024-001",
            certificateDate: piData.PIDate,
            documentDate: piData.PIDate,

            products: grouped.map((product: any) => {
                const codeValues = product.data.map((item: any) => item.PRSGDesc);
                const values = product.data.map((item: any) => item.value);
                const pieceWeight = (parseInt(product.PRSPPiece) * parseInt(product.PRSPWeight)).toString();
                const totalValue = product.data.reduce((sum: number, item: any) => sum + (item.value || 0), 0);

                return {
                    ...product,
                    codeValues,
                    values,
                    pieceWeight,
                    totalValue
                };
            })
        };

        templateData.grandTotal = grouped.reduce((sum: number, product: any) => {
            return sum + product.data.reduce((productSum: number, item: any) => productSum + (item.value || 0), 0);
        }, 0);

        // Get createdAt from PI data
        templateData.createdAt = piData.createdAt ? format(new Date(piData.createdAt), "dd/MM/yyyy") : '';

        const templatePath = path.join(__dirname, '../../templates/codelist-template.html');
        return await generatePDF(templatePath, templateData);
    } catch (e) {
        console.error('Generate Code List PDF error:', e);
        return { success: false };
    }
};

const generateTraceabilityPDF = async (id: string): Promise<{ success: boolean; data?: Buffer }> => {
    try {
        const piData: any = await getPI(id);
        const traceabilityData: any = await getTraceability(id);
        const results = await Promise.all(
            traceabilityData.map(async (item: any) => {
                const details = await getItemDetail(item.ItemId);
                const grade = details.map((d: any) => d.size).join(",   ");
                const farm: any = await getFarm(item.code);

                return {
                    ...item,
                    grade: grade,
                    farmName: farm[0] ? farm[0].farmName : "Farm Name"
                };
            })
        );

        const products = transformProducts(results, piData);
        // Get createdAt from PI data
        const createdAt = piData.createdAt ? format(new Date(piData.createdAt), "dd/MM/yyyy") : '';
        const templateData = {
            processorCode: piData.pcApprovalNo,
            processorName: piData.pcName,
            exporterName: piData.ecName || "M/S.GAYATRI AQUA PRODUCTS PRIVATE LIMITED",
            poNumber: piData.PONumber || "KRS-9017",
            buyerName: piData.ccName || "MATSUOKA CO. LTD.,",
            createdAt,
            products: products
        };

        const templatePath = path.join(__dirname, '../../templates/traceability-template.html');
        return await generatePDF(templatePath, templateData);
    } catch (e) {
        console.error('Generate Traceability PDF error:', e);
        return { success: false };
    }
};

const generateBacteriologicalPDF = async (id: string): Promise<{ success: boolean; data?: Buffer }> => {
    try {
        const piData: any = await getPI(id);
        const BARData: any = await getBAR(id);
        const results = await Promise.all(
            BARData.map(async (item: any) => {
                const details = await getItemDetail(item.ItemId);
                const grade = details.map((d: any) => d.size).join(",   ");
                const farm: any = await getFarm(item.code);

                return {
                    ...item,
                    grade: grade,
                    farmName: farm[0] ? farm[0].farmName : "Farm Name"
                };
            })
        );

        const templateData = transformBARProducts(results, piData);
        templateData.approvalNo = piData.pcApprovalNo;

        const templatePath = path.join(__dirname, '../../templates/bacteriological-template.html');
        return await generatePDF(templatePath, templateData);
    } catch (e) {
        console.error('Generate Bacteriological PDF error:', e);
        return { success: false };
    }
};

const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const day = date.getDate();
    const suffix = ["th", "st", "nd", "rd"][(day % 10 > 3 || Math.floor(day % 100 / 10) === 1) ? 0 : day % 10];
    const month = date.toLocaleString("en-US", { month: "long" });
    const year = date.getFullYear();
    return `${day}${suffix} ${month} ${year}`;
}

const getPI = async (id: string) => {
    const query = `
            SELECT 
            pi.PINo as PINo,
            pi.PIDate as PIDate,
            pi.TDP as TDP,
            pi.GSTIn as GSTIn,
            pi.PONumber as PONumber,
            pi.shipDate as shipDate,
            pi.createdAt as createdAt,
            ec.companyName AS ecName,
            ec.address1 as ecAddress,
            ec.city as ecCity,
            ec.state as ecState,
            ec.country as ecCountry,
            ec.pinCode as ecPinCode,
            ec.email as ecMail,
            pc.companyName AS pcName,
            pc.address1 as pcAddress,
            pc.state as pcState,
            pc.city as pcCity,
            pc.country as pcCountry,
            pc.approvalNo as pcApprovalNo,
            cc.companyName AS ccName,
            cc.address1 as ccAddress,
            cc.city as ccCity,
            cc.state as ccState,
            cc.country as ccCountry,
            lp.portName AS lpName,
            lp.country AS lpCountry,
            dp.portName AS dpName,
            dp.country AS dpCountry,
            bn.bankName AS bnName,
            bn.address1 as bnAddress,
            bn.swift as bnSwift,
            bn.IFSCCode as bnIFSCCode,
            bn.acNo as bnACNO
        FROM tbl_pi AS pi
        JOIN tbl_companies AS ec ON pi.exporterId = ec.companyId
        JOIN tbl_companies AS pc ON pi.processorId = pc.companyId
        JOIN tbl_companies AS cc ON pi.consigneeId = cc.companyId
        JOIN tbl_ports AS lp ON pi.loadingPortId = lp.portId
        JOIN tbl_ports AS dp ON pi.dischargePortId = dp.portId
        JOIN tbl_banks AS bn ON pi.bankId = bn.bankId
        WHERE pi.PIId = :id
        ORDER BY pi.createdAt DESC;
        `;

    if (id != '') {
        const results = await sequelize.query(query, {
            replacements: { id },
            type: QueryTypes.SELECT
        });
        return results[0];
    } else {
        const results = await sequelize.query(query, {
            type: QueryTypes.SELECT
        });
        return results[0];
    }
}

const getItem = async (id: string) => {
    const query = `
        select 
            item.ItemId,
            item.marksNo as marksNo,
            prf.PRFName as PRFName,
            prs.PRSName as PRSName,
            prs.scientificName as scientificName,
            prst.PRSTName as PRSTName,
            prsp.PRSPPiece as PRSPPiece,
            prsp.PRSPWeight as PRSPWeight, 
            prspw.PRSPWUnit as PRSPWUnit,
            prspws.PRSPWSStyle as PRSPWSStyle,
            prsv.PRSVDesc as PRSVDesc
        from tbl_items as item 
        left join tbl_prf as prf on item.PRFId = prf.PRFId
        left join tbl_prs as prs on item.PRSId = prs.PRSId
        left join tbl_prst as prst on item.PRSTId = prst.PRSTId
        left join tbl_prsp as prsp on item.PRSPId = prsp.PRSPId
        left join tbl_prsv as prsv on item.PRSVId = prsv.PRSVId
        left join tbl_prspw as prspw on prsp.PRSPWId = prspw.PRSPWId
        left join tbl_prspws as prspws on prsp.PRSPWSId = prspws.PRSPWSId
        where PIId = :id
        `;

    if (id != '') {
        const results = await sequelize.query(query, {
            replacements: { id },
            type: QueryTypes.SELECT
        });
        return results;
    } else {
        const results = await sequelize.query(query, {
            type: QueryTypes.SELECT
        });
        return results;
    }
}

const getItemDetail = async (id: string) => {
    const query = `select size, cartons, kgQty, usdRate, usdAmount from tbl_item_details where ItemId = :id`;

    if (id != '') {
        const results = await sequelize.query(query, {
            replacements: { id },
            type: QueryTypes.SELECT
        });
        return results;
    } else {
        const results = await sequelize.query(query, {
            type: QueryTypes.SELECT
        });
        return results;
    }
}

const getFarm = async (code: string) => {
    const query = `select c.companyName as farmName  
        from tbl_code_list as cl
        left join tbl_companies as c on c.companyId = cl.farmId
        where cl.code = :code GROUP BY code`;

    if (code != '') {
        const results = await sequelize.query(query, {
            replacements: { code },
            type: QueryTypes.SELECT
        });
        return results;
    } else {
        const results = await sequelize.query(query, {
            type: QueryTypes.SELECT
        });
        return results;
    }
}

const getCodeList = async (id: string) => {
    const query = `SELECT cl.ItemId, cl.code, cl.value, prs.PRSName, prst.PRSTName, prsg.PRSGDesc, prsp.PRSPPiece, prsp.PRSPWeight, prspw.PRSPWUnit, prspws.PRSPWSStyle, c.companyName as farmName
            FROM tbl_code_list AS cl
            LEFT JOIN tbl_items AS item ON item.ItemId = cl.ItemId
            LEFT JOIN tbl_prs as prs ON item.PRSId = prs.PRSId
            LEFT JOIN tbl_prst as prst on item.PRSTId = prst.PRSTId
            LEFT JOIN tbl_prsg as prsg ON prsg.PRSGId = cl.PRSGId
            LEFT JOIN tbl_prsp as prsp ON prsp.PRSPId = item.PRSPId
            LEFT JOIN tbl_prspw as prspw ON prspw.PRSPWId = prsp.PRSPWId
            LEFT JOIN tbl_prspws as prspws ON prspws.PRSPWSId = prsp.PRSPWSId
            LEFT JOIN tbl_companies as c ON c.companyId = cl.farmId
            WHERE cl.PIId = :id;`;
    const results = await sequelize.query(query, {
        replacements: { id },
        type: QueryTypes.SELECT
    });
    return results;
}

const getTraceability = async (id: string) => {
    const query = `SELECT prsv.PRSVDesc, prs.PRSName, prst.PRSTName, prsp.PRSPPiece, prsp.PRSPWeight, prspw.PRSPWUnit, ta.*
        from tbl_trace_ability as ta
        LEFT JOIN tbl_items AS item ON item.ItemId = ta.ItemId
        LEFT JOIN tbl_prs as prs ON item.PRSId = prs.PRSId
        LEFT JOIN tbl_prst as prst ON item.PRSTId = prst.PRSTId
        LEFT JOIN tbl_prsv as prsv ON item.PRSVId = prsv.PRSVId
        LEFT JOIN tbl_prsp as prsp ON item.PRSPId = prsp.PRSPId
        LEFT JOIN tbl_prspw as prspw ON prspw.PRSPWId = prsp.PRSPWId
        where ta.PIId = :id`;
    const results = await sequelize.query(query, {
        replacements: { id },
        type: QueryTypes.SELECT
    });
    return results;
}

const getBAR = async (id: string) => {
    const query = `SELECT prsv.PRSVDesc, prs.PRSName, prst.PRSTName, prsp.PRSPPiece, prsp.PRSPWeight, prspw.PRSPWUnit, bar.*
        from tbl_bar as bar
        LEFT JOIN tbl_items AS item ON item.ItemId = bar.ItemId
        LEFT JOIN tbl_prs prs ON item.PRSId = prs.PRSId
        LEFT JOIN tbl_prst as prst ON item.PRSTId = prst.PRSTId
        LEFT JOIN tbl_prsv as prsv ON item.PRSVId = prsv.PRSVId
        LEFT JOIN tbl_prsp as prsp ON item.PRSPId = prsp.PRSPId
        LEFT JOIN tbl_prspw as prspw ON prspw.PRSPWId = prsp.PRSPWId
        where bar.PIId = :id`;
    const results = await sequelize.query(query, {
        replacements: { id },
        type: QueryTypes.SELECT
    });
    return results;
}

const transformProducts = (data: any[], piData: any = {}) => {
    const grouped = Object.values(
        data.reduce((acc: any, item: any) => {
            if (!acc[item.ItemId]) {
                acc[item.ItemId] = {
                    productName: item.PRSVDesc.trim(),
                    variety: `${piData.pcCountry || ''} ${item.PRSTName || ''} ${item.PRSName || ''}`.trim(),
                    packType: `${item.PRSPPiece}X${item.PRSPWeight}${item.PRSPWUnit}`,
                    gradeSet: new Set(),
                    productionData: [],
                    totals: { raw: 0, headless: 0, cases: 0, used: 0, balance: 0 }
                };
            }

            item.grade.split(", ").map((g: string) => acc[item.ItemId].gradeSet.add(g.trim()));

            acc[item.ItemId].productionData.push({
                productionDate: format(new Date(item.productDate), "dd/MM/yyyy"),
                rawMaterialQty: item.rawMaterialQty,
                headlessQty: item.headlessQty,
                code: item.code,
                total: item.total,
                usedCase: item.usedCase,
                balanceCase: item.ballanceCase,
                traceability: item.farmName,
                bestBeforeDate: format(new Date(item.beforeDate), "dd/MM/yyyy")
            });

            acc[item.ItemId].totals.raw += Number(item.rawMaterialQty);
            acc[item.ItemId].totals.headless += Number(item.headlessQty);
            acc[item.ItemId].totals.cases += Number(item.total);
            acc[item.ItemId].totals.used += Number(item.usedCase);
            acc[item.ItemId].totals.balance += Number(item.ballanceCase);

            return acc;
        }, {})
    );

    return grouped.map((g: any) => ({
        productName: g.productName,
        variety: g.variety,
        packType: g.packType,
        grade: "GRADE:" + Array.from(g.gradeSet).join(","),
        sampleScale: `SAMPLE SCALE = √${g.totals.raw}+1/2 =20MCS`,
        productionData: g.productionData,
        totalRawMaterial: g.totals.raw.toString(),
        totalHeadless: g.totals.headless.toString(),
        totalCases: g.totals.cases.toString(),
        totalUsedCase: g.totals.used.toString(),
        totalBalanceCase: g.totals.balance.toString()
    }));
};

function
    transformBARProducts(data: any[], piData: any = {}): any {
    if (!Array.isArray(data)) data = [];

    const groups = new Map<any, any[]>();
    data.forEach((d: any) => {
        const key = d.ItemId ?? '__no_item';
        if (!groups.has(key)) groups.set(key, []);
        groups.get(key)!.push(d);
    });

    const reports = Array.from(groups.entries()).map(([itemId, items]: [any, any[]]) => {
        const first = items[0] || {};

        const gradeSet = new Set<string>();
        items.forEach((d: any) => {
            if (d.grade) {
                d.grade
                    .toString()
                    .split(',')
                    .map((g: string) => g.trim())
                    .forEach((g: string) => { if (g) gradeSet.add(g); });
            }
        });
        const grade = Array.from(gradeSet).join(',');

        const productionCodes: string[] = [];
        items.forEach((d: any) => {
            const c = (d.code ?? '').toString().trim();
            if (c && !productionCodes.includes(c)) productionCodes.push(c);
        });

        const farms: string[] = [];
        items.forEach((d: any) => {
            const f = (d.farmName ?? '').toString().trim();
            if (f && !farms.includes(f)) farms.push(f);
        });

        const packingType = `${first.PRSPPiece ?? 1}X${first.PRSPWeight ?? 0}${first.PRSPWUnit ?? ''}.`;

        const isChinaDestination = piData.dpCountry &&
            piData.dpCountry.toString().trim().toLowerCase().includes('china');

        let analysisResults: any[] = items.map((d: any) => ({
            code: d.code,
            analysisDate: d.analysisDate ? format(new Date(d.analysisDate), "dd/MM/yyyy") : '',
            completionDate: d.completionDate ? format(new Date(d.completionDate), "dd/MM/yyyy") : '',
            totalPlateCount: d.totalPlateCnt,
            eColi: d.ECFU,
            sAureus: d.SCFU,
            salmonella: d.salmone,
            vibrioCholera: d.vibrioC,
            vibrioParahaemolyticus: d.vibrioP,
            listeriaMonocytogenes: d.listeria
        }));

        if (isChinaDestination) {
            const expandedResults: any[] = [];
            analysisResults.forEach((result) => {
                const basePlateCount = parseFloat(result.totalPlateCount) || 0;

                for (let i = 0; i < 5; i++) {
                    let modifiedPlateCount: number;

                    if (i === 0) {
                        modifiedPlateCount = basePlateCount;
                    } else {
                        const multiplier = 1 - (i * 0.2);
                        modifiedPlateCount = Math.round(basePlateCount * multiplier);
                        if (basePlateCount > 0 && modifiedPlateCount < 1) {
                            modifiedPlateCount = 1;
                        }
                    }

                    expandedResults.push({
                        ...result,
                        totalPlateCount: modifiedPlateCount
                    });
                }
            });
            analysisResults = expandedResults;
        }

        // Get createdAt from PI data
        const createdAt = (piData as any).createdAt 
            ? format(new Date((piData as any).createdAt), "dd/MM/yyyy") 
            : '';

        return {
            approvalNo: piData.pcApprovalNo || "1904",
            processorName: piData.pcName || "M/S.THARANGINI SEA FOODS",
            exporterName: piData.ecName || "M/S.GAYATRI AQUA PRODUCT PVT LTD",
            buyerName: piData.ccName || "Vietnam Rich Beauty Foods Co., Ltd",
            buyerAddress: piData.ccAddress || "T un son Fish Harbour, Quang Long Doai village, T hai T huy, T hai Binh Provience, Vietnam",
            poNumber: piData.PONumber || "WPE-002",
            variety: `${piData.pcCountry || ''} ${first.PRSTName || ''} ${first.PRSName || ''}`.trim(),
            species: first.PRSName?.toString().trim() || "Species",
            totalMCs: "1500",
            grade,
            productionCode: productionCodes.join(', '),
            traceability: farms.join(', '),
            packingType,
            samplingType: "COMPOSITE",
            createdAt,
            analysisResults
        };
    });

    return { reports };
}