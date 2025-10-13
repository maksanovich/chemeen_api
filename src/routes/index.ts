import routerx from 'express-promise-router';

import { masterRouter } from './master';
import { productRouter } from './product';

export const mainRouter = routerx();

mainRouter.use('/master', masterRouter);
mainRouter.use('/product', productRouter);

