import { Router } from "express";
import schemaValidation from "../middlewares/schemaValidation";
import { testSchema } from "../schemas/testSchema";
import * as testController from '../controllers/testControllers'
import tokenVerification from "../middlewares/tokenVerification";

const testRouter = Router()
testRouter.use(tokenVerification)

testRouter.post('/tests',schemaValidation(testSchema),testController.createTests)
testRouter.get('/tests/:termId/:disciplineId',testController.getAllFromTermAndDisciplineId)
testRouter.get('/tests/:teacherId',testController.getAllFromTeacherId)

export default testRouter