import express from "express";
import { uploadMiddleware } from "../utils/handleStorage.js"
import { StorageController } from "../controllers/storage.js";
import { validatorGetItem } from "../validators/tracks.js";


export const router = express.Router()

// Ruta para listar los storage
router.get("/", StorageController.getStorages)

// Obtener un archivo por su id
router.get("/:id", validatorGetItem, StorageController.getStorage)

// Crear un archivo
router.post("/", uploadMiddleware.single("myfile"), StorageController.createStorage)

// Eliminar un archivo por su id
router.delete("/:id", validatorGetItem, StorageController.deleteStorage)


