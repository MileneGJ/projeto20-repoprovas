import { Router } from "express";
import * as termController from '../controllers/termControllers'
import tokenVerification from "../middlewares/tokenVerification";

const termRouter = Router()
termRouter.use(tokenVerification)

termRouter.get('/terms',termController.getAllTerms)

export default termRouter