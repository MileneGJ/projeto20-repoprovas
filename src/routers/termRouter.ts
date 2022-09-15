import { Router } from "express";
import * as termController from '../controllers/termControllers'

const termRouter = Router()

termRouter.get('/terms',termController.getAllTerms)

export default termRouter