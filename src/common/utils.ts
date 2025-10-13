const { ToWords } = require('to-words');

export const convertId = (param: any[], idField: string) => {
    const transformedResult = param.map(item => {
        const id = item.dataValues[idField];
        const { [idField]: _, ...rest } = item.dataValues;
        return { _id: id, ...rest };
    });
    return transformedResult;
};

export const amount2word = (param: any) => {
    const toWords = new ToWords({
        localeCode: 'en-US',
        converterOptions: {
            currency: true,
            ignoreDecimal: false,
            ignoreZeroCurrency: false,
            doNotAddOnly: false,
            currencyOptions: {
                // can be used to override defaults for the selected locale
                name: 'Dollars',
                plural: 'US DOLLAR',
                symbol: '$',
                fractionalUnit: {
                    name: 'Cent',
                    plural: 'CENT',
                    symbol: '',
                },
            },
        },
    });


    let words = toWords.convert(param, { currency: true });
    return words
}