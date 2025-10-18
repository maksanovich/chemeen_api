import routerx from 'express-promise-router';

import { companyRouter } from './company.route';
import { bankRouter } from './bank.route';
import { portRouter } from './port.route';
import { PRFRouter } from './PRF.route';
import { PRSRouter } from './PRS.route';
import { PRSTRouter } from './PRST.route';
import { PRSPWRouter } from './PRSPW.route';

import { PRSPWSRouter } from './PRSPWS.route';
import { PRSVRouter } from './PRSV.route';
import { PRSPSRouter } from './PRSPS.route';
import { PRSGRouter } from './PRSG.route';
import { PRSPRouter } from './PRSP.route';

import { testRouter } from './test.route';

export const masterRouter = routerx();

masterRouter.use('/company', companyRouter);
masterRouter.use('/bank', bankRouter);
masterRouter.use('/port', portRouter);
masterRouter.use('/PRF', PRFRouter);
masterRouter.use('/PRS', PRSRouter);
masterRouter.use('/PRST', PRSTRouter);
masterRouter.use('/PRSPW', PRSPWRouter);

masterRouter.use('/PRSPWS', PRSPWSRouter);
masterRouter.use('/PRSV', PRSVRouter);
masterRouter.use('/PRSPS', PRSPSRouter);
masterRouter.use('/PRSG', PRSGRouter);
masterRouter.use('/PRSP', PRSPRouter);

masterRouter.use('/test', testRouter);