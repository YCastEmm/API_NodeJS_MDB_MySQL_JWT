import { models } from "../models/index.js";
const { storageModel } = models
const PUBLIC_URL = process.env.PUBLIC_URL

/**
 * Obtener todos los storages
 * @param {*} req 
 * @param {*} res 
 */
const getStorages = async (req, res) =>{
    const data = await storageModel.find({})
    res.send(data)
}

/**
 * Obtener un storage
 * @param {*} req 
 * @param {*} res 
 */
const getStorage = (req, res) =>{

}

/**
 * Crear un storage
 * @param {*} req 
 * @param {*} res 
 */
const createStorage = async (req, res) => {
    const { body, file } = req;

    const fileData = {
        filename: file.filename,
        url: `${PUBLIC_URL}/${file.filename}`
    }

    const data = await storageModel.create(fileData);
    
    // Enviar todo el objeto req (no recomendado para producción)
    res.send({data});
}

/**
 * Modificar un storage 
 * @param {*} req 
 * @param {*} res 
 */
const updateStorage = (req, res) =>{

}

/**
 * Eliminar un storage
 * @param {*} req 
 * @param {*} res 
 */
const deleteStorage = (req, res) =>{

}



export const StorageController = {
                                    getStorage,
                                    getStorage,
                                    createStorage,
                                    updateStorage,
                                    deleteStorage
                                }