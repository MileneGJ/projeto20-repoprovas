import { Router } from "express";
import * as teacherController from '../controllers/teacherControllers'

const teacherRouter = Router()

teacherRouter.get('/teachers',teacherController.getAllTeachers)

export default teacherRouter