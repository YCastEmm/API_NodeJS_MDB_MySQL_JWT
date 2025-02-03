import express from "express";
import { TrackController } from "../controllers/tracks.js";
import { validatorCreateItem } from "../validators/tracks.js";
import { customHeader } from "../middlewares/customHeader.js";


export const router = express.Router()


router.get("/", TrackController.getTracks)

router.post("/", validatorCreateItem, customHeader, TrackController.createTrack)