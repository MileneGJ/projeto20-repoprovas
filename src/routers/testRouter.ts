import { Router } from "express";
import schemaValidation from "../middlewares/schemaValidation";
import { testSchema } from "../schemas/testSchema";
import * as testController from '../controllers/testControllers'
import tokenVerification from "../middlewares/tokenVerification";

const testRouter = Router()

testRouter.post('/tests',tokenVerification,schemaValidation(testSchema),testController.createTests)
testRouter.get('/tests/:termId/:disciplineId',tokenVerification,testController.getAllFromTermAndDisciplineId)
testRouter.get('/tests/:teacherId',tokenVerification,testController.getAllFromTeacherId)

export default testRouter