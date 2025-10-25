export interface IPI {
    PINo: string;
    PIDate: string;
    GSTIn: string;
    PONumber: string;
    POQuality: string;
    netQuantity: string,
    grossQuantity: string,
    shipDate: string;
    exporterId: number;
    processorId: number;
    consigneeId: number;
    beneficiary: string;
    beneficiaryAddress: string;
    bankId: number;
    TDP: string;
    loadingPortId: number;
    dischargePortId: number;
    marksNo: string;
    containerNumber: string;
    linerNumber: string,
    PRFId: number;
    PRSId: number;
    PRSTId: number;
    PRSPId: number;
    PRSVId: number;
    PRSPSId: number;
};

export interface IItemDetail {
    _id: string;
    size: string;
    cartons: string;
    kgQty: string;
    usdRate: string;
    usdAmount: string;
}

export interface IElisa {
    testReportNo: string,
    testReportDate: string,
    rawMeterialDate: string,
    productionCode: string,
    sampleDrawnBy: string,
    sampleId: string,
    rawMaterialType: string,
    rawMaterialReceived: string,
    pondId: string,
    samplingDate: string,
    samplingReceiptDate: string,
    testedBy: string,
}