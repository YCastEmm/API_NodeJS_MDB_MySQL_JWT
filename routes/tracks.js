import express from "express";
import { TrackController } from "../controllers/tracks.js";
export const router = express.Router()




router.get("/", TrackController.getTracks)

router.post("/", TrackController.createTrack)