import express from "express";
import { TrackController } from "../controllers/tracks.js";
import { validatorCreateItem, validatorGetItem } from "../validators/tracks.js";
import { authMiddleware } from "../middlewares/session.js";
import { checkRole } from "../middlewares/roles.js";

export const router = express.Router()

// Ruta para listar los tracks
router.get("/", authMiddleware, TrackController.getTracks)

// Ruta para obtener un track por id
router.get("/:id",authMiddleware, validatorGetItem, TrackController.getTrack)

// Ruta para crear un track
router.post("/", authMiddleware, checkRole(["admin"]), validatorCreateItem, TrackController.createTrack, )

// Ruta para actualizar un track 
router.put("/:id", authMiddleware, validatorGetItem, validatorCreateItem, TrackController.updateTrack)

// Ruta para eliminar un track
router.delete("/:id", authMiddleware, validatorGetItem, TrackController.deleteTrack)