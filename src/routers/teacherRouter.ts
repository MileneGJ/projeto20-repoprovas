import { Router } from "express";
import * as teacherController from '../controllers/teacherControllers'
import tokenVerification from "../middlewares/tokenVerification";

const teacherRouter = Router()

teacherRouter.get('/teachers',tokenVerification,teacherController.getAllTeachers)

export default teacherRouter