import { Router } from "express";
import * as termController from '../controllers/termControllers'
import tokenVerification from "../middlewares/tokenVerification";

const termRouter = Router()

termRouter.get('/terms',tokenVerification,termController.getAllTerms)

export default termRouter