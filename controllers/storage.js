import { models } from "../models/index.js";
import { matchedData } from "express-validator";
import { handleHTTPError } from "../utils/handleError.js";
import { handleResponse } from "../utils/handleResponse.js";
import fs from "fs";
import { fileURLToPath } from "url";
const { storageModel } = models;

const PUBLIC_URL = process.env.PUBLIC_URL;
const MEDIA_PATH = fileURLToPath(new URL("../storage", import.meta.url)); //Obtengo la ruta del archivo actual con formato URL, lo redirijo a ../storage y luego la paso a formato Path

// Listar los archivos
const getStorages = async (req, res) => {
    try {
        const data = await storageModel.find({});
        
        handleResponse(res, 200, "Se listaron todos los archivos del storage", data)

    } catch (error) {
        const errorMessage = "Error en getStorages.";
        handleHTTPError(res, errorMessage, 503);
    }
};

// Obtener un archivo por su id
const getStorage = async (req, res) => {
    try {
        const { id } = matchedData(req);
        const data = await storageModel.findById(id);
        
        if (!data) {
            return handleHTTPError(res, "Archivo no encontrado", 404);
        }

        handleResponse(res, 200, "Se obtuvo correctamente el archivo por el ID ingresado", data)
    } catch (error) {
        const errorMessage = "Error en getStorage.";
        handleHTTPError(res, errorMessage, 503);
    }
};

// Subir un archivo
const createStorage = async (req, res) => {
    try {
        const { body, file } = req;

        const fileData = {
            filename: file.filename,
            url: `${PUBLIC_URL}/${file.filename}`,
        };

        const data = await storageModel.create(fileData);

        // Enviar todo el objeto req (no recomendado para producción)
        handleResponse(res, 200, "Se subió correctamente el archivo", data)

    } catch (error) {
        const errorMessage = "Error en createStorage.";
        handleHTTPError(res, errorMessage, 503);
    }
};

// Realizar un borrado lógico del archivo
const deleteStorage = async (req, res) => {
    try {
        const { id } = matchedData(req);

        const data = await storageModel.findById(id);
        if (!data) {
            return handleHTTPError(res, "Archivo no encontrado", 404);
        }

        await data.delete();

        handleResponse(res, 200, "Se marcó el archivo como eliminado", { file: data.filename });
    } catch (error) {
        handleHTTPError(res, "Error en deleteStorage", 503);
    }
};


export const StorageController = {
    getStorages,
    getStorage,
    createStorage,
    deleteStorage,
};
