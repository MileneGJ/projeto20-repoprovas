import { Router } from "express";
import schemaValidation from "../middlewares/schemaValidation";
import { testSchema } from "../schemas/testSchema";
import * as testController from '../controllers/testControllers'

const testRouter = Router()

testRouter.post('/tests',schemaValidation(testSchema),testController.createTests)

export default testRouter