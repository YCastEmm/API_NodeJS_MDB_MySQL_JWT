import express from "express";
import { TrackController } from "../controllers/tracks.js";
import { validatorCreateItem } from "../validators/tracks.js";

export const router = express.Router()


router.get("/", TrackController.getTracks)

router.post("/", validatorCreateItem, TrackController.createTrack)