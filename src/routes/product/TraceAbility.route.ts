import express from "express";
import * as TraceAbilityController from '../../controllers/product/TraceAbility.controller';

export const TraceAbilityRoute = express.Router();

TraceAbilityRoute.get('/', TraceAbilityController.findAll);
TraceAbilityRoute.get('/:id', TraceAbilityController.find);
TraceAbilityRoute.post('/', TraceAbilityController.create);
TraceAbilityRoute.put('/', TraceAbilityController.update);
TraceAbilityRoute.delete('/:id', TraceAbilityController.remove);
