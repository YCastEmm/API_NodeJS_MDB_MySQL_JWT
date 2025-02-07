import { matchedData } from "express-validator";
import { models } from "../models/index.js";
import { handleError } from "../utils/handleError.js";

const { tracksModel } = models


/**
 * Obtener todos los tracks
 * @param {*} req 
 * @param {*} res 
 */
const getTracks = async (req, res) =>{
    try {
        const data = await tracksModel.find({})
        res.send(data)
    } catch (error) {
        const errorMessage = "Error en getTracks."
        handleError.handleHTTPError(res, errorMessage, 503)
    }
}

/**
 * Obtener un track
 * @param {*} req 
 * @param {*} res 
 */
const getTrack = (req, res) =>{
ñ
}

/**
 * Crear un track
 * @param {*} req 
 * @param {*} res 
 */
const createTrack = async (req, res) =>{
    try {

        const body = matchedData(req)
        const data = await tracksModelaa.create(body) // función de la librería express-validator en Node.js. Se usa para extraer solo los datos validados de la solicitud (req)
        res.send({ data })
    } catch (error) {
        const errorMessage = "Error en createTrack."
        handleError.handleHTTPError(res, errorMessage, 503)
    }
}

/**
 * Modificar un track 
 * @param {*} req 
 * @param {*} res 
 */
const updateTrack = (req, res) =>{

}

/**
 * Eliminar un track
 * @param {*} req 
 * @param {*} res 
 */
const deleteTrack = (req, res) =>{

}



export const TrackController = {
                                    getTracks,
                                    getTrack,
                                    createTrack,
                                    updateTrack,
                                    deleteTrack
                                }