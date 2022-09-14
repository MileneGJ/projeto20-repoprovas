import { Router } from "express"
import schemaValidation from "../middlewares/schemaValidation"
import { authSchema } from "../schemas/authSchema"
import * as authController from '../controllers/authControllers'

const authRouter = Router()

authRouter.post('/signup',schemaValidation(authSchema),authController.createUser)
authRouter.post('/signin',schemaValidation(authSchema),authController.authenticateUser)

export default authRouter