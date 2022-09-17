import { Router } from "express";
import * as teacherController from '../controllers/teacherControllers'
import tokenVerification from "../middlewares/tokenVerification";

const teacherRouter = Router()
teacherRouter.use(tokenVerification)

teacherRouter.get('/teachers',teacherController.getAllTeachers)

export default teacherRouter