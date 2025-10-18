import routerx from 'express-promise-router';

import { PIRouter } from './PI.route';
import { ItemRouter } from './item.route';
import { ItemDetailRoute } from './itemDetail.route';
import { CodeListRoute } from './CodeList.route';
import { TraceAbilityRoute } from './TraceAbility.route';
import { BarRoute } from './BAR.route';
import { ElisaRouter } from './Elisa.route';
import { ElisaDetailRouter } from './ElisaDetail.route';
import { ElisaPDFRouter } from './ElisaPDF.route';

export const productRouter = routerx();

productRouter.use('/PI', PIRouter);
productRouter.use('/item', ItemRouter);
productRouter.use('/itemDetail', ItemDetailRoute);
productRouter.use('/codeList', CodeListRoute);
productRouter.use('/traceAbility', TraceAbilityRoute);
productRouter.use('/bar', BarRoute);
productRouter.use('/elisa', ElisaRouter);
productRouter.use('/elisaDetail', ElisaDetailRouter);
productRouter.use('/elisaPDF', ElisaPDFRouter);