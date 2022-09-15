import { Router } from "express";
import tokenVerification from "../middlewares/tokenVerification";
import authRouter from "./authRouter";
import disciplineRouter from "./disciplineRouter";
import termRouter from "./termRouter";
import testRouter from "./testRouter";

const router = Router()

router.use(authRouter)
router.use(tokenVerification)
router.use(testRouter)
router.use(termRouter)
router.use(disciplineRouter)

export default router