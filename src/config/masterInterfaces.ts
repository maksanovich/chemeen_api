export interface ICompany {
    type: string;
    companyName: string;
    approvalNo: string;
    address1: string;
    address2: string;
    city: string;
    state: string;
    country: string;
    pinCode: string;
    phone: string;
    mobile: string;
    email: string;
}

export interface IBank {
    bankName: string;
    acNo: string;
    swift: string;
    IFSCCode: string;
    address1: string;
    address2: string;
    city: string;
    state: string;
    country: string;
    pinCode: string;
    phone: string;
    mobile: string;
    email: string;
}

export interface IPort {
    portName: string;
    country: string;
}

export interface IPRF {
    PRFName: string;
    HSN: string;
}

export interface IPRS {
    PRFId: number;
    PRSName: string;
    scientificName: string;
};

export interface IPRST {
    PRSTName: string;
};

export interface IPRSPW {
    PRSPWUnit: string;
};

export interface IPRSPWS {
    PRSPWSStyle: string;
};

export interface IPRSV {
    PRSVDesc: string;
};

export interface IPRSPS {
    PRSPSDesc: string;
};

export interface IPRSG {
    PRSPSId: number;
    PRSGDesc: string;
};

export interface IPRSP {
    PRSPPiece: number;
    PRSPWeight: number;
    PRSPWId: number;
    PRSPWSId: number;
};

export interface ITest {
    testId: string;
    testDesc: string;
};

export interface ITestParameters {
    testId: string;
    testParams: string;
    detectionLimit: string;
};
