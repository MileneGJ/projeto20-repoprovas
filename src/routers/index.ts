import { Router } from "express";
import errorHandler from "../middlewares/errorHandler";
import authRouter from "./authRouter";
import testRouter from "./testRouter";

const router = Router()

router.use(authRouter)
router.use(errorHandler)
router.use(testRouter)

export default router