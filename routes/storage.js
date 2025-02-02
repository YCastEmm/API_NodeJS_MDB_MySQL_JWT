import express from "express";
export const router = express.Router()
import { uploadMiddleware } from "../utils/handleStorage.js"
import { StorageController } from "../controllers/storage.js";


router.post("/", uploadMiddleware.single("myfile"), StorageController.createStorage)
