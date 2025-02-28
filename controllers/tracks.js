import { matchedData } from "express-validator";
import { models } from "../models/index.js";
import { handleError } from "../utils/handleError.js";

const { tracksModel } = models


// Listar los tracks
const getTracks = async (req, res) =>{
    try {
        const data = await tracksModel.find({})
        res.send(data)
    } catch (error) {
        const errorMessage = "Error en getTracks."
        handleError.handleHTTPError(res, errorMessage, 503)
    }
}

// Obtener un track por su id
const getTrack = async (req, res) =>{
    try {
        req = matchedData(req)
        const { id } = req
        const data = await tracksModel.findById(id)
        res.send({data})
    } catch (error) {
        const errorMessage = "Error en getTrack."
        handleError.handleHTTPError(res, errorMessage, 503)
    }
}

// Crear un track
const createTrack = async (req, res) =>{
    try {
        const body = matchedData(req)
        const data = await tracksModel.create(body) // función de la librería express-validator en Node.js. Se usa para extraer solo los datos validados de la solicitud (req)
        res.send({ data })
    } catch (error) {
        const errorMessage = "Error en createTrack."
        handleError.handleHTTPError(res, errorMessage, 503)
    }
}


// Modificar un track
const updateTrack = async (req, res) =>{
    try {
        const { id, ...body } = matchedData(req)
        const data = await tracksModel.findByIdAndUpdate(
            id, body
        ) 
        res.send({ data })
    } catch (error) {
        const errorMessage = "Error en updateTrack."
        handleError.handleHTTPError(res, errorMessage, 503)
    }
}

// Eliminar un track
const deleteTrack = async (req, res) =>{
    try {
        const { id } = matchedData(req)

        const track = await tracksModel.findById(id)
        if (!track) {
            return res.status(404).json({ error: "El track que se quiere eliminar no existe." });
            
        }
        const data = await tracksModel.delete({ _id: id }); // Método traido de mongoose-delete para eliminación lógica: marca el documento como eliminado sin borrarlo físicamente
        res.json({message: "Track eliminado correctamente", deletedTrack: data})
    } catch (error) {
        const errorMessage = "Error en deleteTrack."
        handleError.handleHTTPError(res, errorMessage, 503)
    }
}



export const TrackController = {
                                    getTracks,
                                    getTrack,
                                    createTrack,
                                    updateTrack,
                                    deleteTrack
                                }