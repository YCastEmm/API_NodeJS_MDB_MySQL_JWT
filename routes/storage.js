import express from "express";
import { uploadMiddleware } from "../utils/handleStorage.js"
import { StorageController } from "../controllers/storage.js";
import { validatorGetItem } from "../validators/tracks.js";
import { authMiddleware } from "../middlewares/session.js";
import { checkRole } from "../middlewares/roles.js";

export const router = express.Router()

// Ruta para listar los storage
router.get("/", authMiddleware, StorageController.getStorages)

// Obtener un archivo por su id
router.get("/:id", authMiddleware, validatorGetItem, StorageController.getStorage)

// Crear un archivo
router.post("/", authMiddleware, checkRole(["admin"]), uploadMiddleware.single("myfile"), StorageController.createStorage)

// Eliminar un archivo por su id
router.delete("/:id", authMiddleware, validatorGetItem, StorageController.deleteStorage)


