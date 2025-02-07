import express from "express";
import { TrackController } from "../controllers/tracks.js";
import { validatorCreateItem, validatorGetItem } from "../validators/tracks.js";
import { customHeader } from "../middlewares/customHeader.js";


export const router = express.Router()

// Ruta para listar los tracks
router.get("/", TrackController.getTracks)

// Ruta para obtener un track por id
router.get("/:id", validatorGetItem, TrackController.getTrack)

// Ruta para crear un track
router.post("/", validatorCreateItem, customHeader, TrackController.createTrack)

// Ruta para actualizar un track 
router.put("/:id", validatorGetItem, validatorCreateItem, TrackController.updateTrack)

// Ruta para eliminar un track
router.delete("/:id", validatorGetItem, TrackController.deleteTrack)