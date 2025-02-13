import { models } from "../models/index.js";
import { matchedData } from "express-validator";
import { handleHTTPError } from "../utils/handleError.js";
import fs from "fs";
import { fileURLToPath } from "url";
const { storageModel } = models;

const PUBLIC_URL = process.env.PUBLIC_URL;
const MEDIA_PATH = fileURLToPath(new URL("../storage", import.meta.url)); //Obteno la ruta del archivo actual con formato URL, lo redirijo a ../storage y luego la paso a formato Path

// Listar los archivos
const getStorages = async (req, res) => {
    try {
        const data = await storageModel.find({});
        res.send(data);
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
        res.send(data);
    } catch (error) {
        const errorMessage = "Error en getStorages.";
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
        res.send({ data });
    } catch (error) {
        const errorMessage = "Error en createStorage.";
        handleHTTPError(res, errorMessage, 503);
    }
};

// Borrar un archivo
const deleteStorage = async (req, res) => {
    try {
        const { id } = matchedData(req);

        // Busco el archivo en la base de datos para ver si existe y obtener el nombre del archivo
        const data = await storageModel.findById(id);
        if (!data) {
            return res.status(404).send({ error: "Archivo no encontrado" });
        }

        const { filename } = data;

        // Elimino el archivo de la base de datos
        await storageModel.deleteOne({ _id: id });

        // Construyo la ruta del archivo en el sistema de archivos
        const filePath = `${MEDIA_PATH}/${filename}`;

        // Verifico si el archivo existe antes de eliminarlo
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        } else {
            return res.status(404).send({ error: "Archivo no encontrado en el sistema de archivos" });
        }

        res.send({ message: `El archivo fue elimnado correctamente`, file: filename });
    } catch (error) {
        const errorMessage = "Error en deleteStorage.";
        handleHTTPError(res, errorMessage, 503);
    }
};

export const StorageController = {
    getStorages,
    getStorage,
    createStorage,
    deleteStorage,
};
