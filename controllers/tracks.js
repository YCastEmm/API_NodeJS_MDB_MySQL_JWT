import { models } from "../models/index.js";

const {tracksModel, usersModel, storageModel} = models


/**
 * Obtener todos los tracks
 * @param {*} req 
 * @param {*} res 
 */
const getTracks = async (req, res) =>{
    const data = await tracksModel.find({})
    res.send(data)
}

/**
 * Obtener un track
 * @param {*} req 
 * @param {*} res 
 */
const getTrack = (req, res) =>{

}

/**
 * Crear un track
 * @param {*} req 
 * @param {*} res 
 */
const createTrack = async (req, res) =>{
    const { body } = req
    
    const data = await tracksModel.create(body)

    res.send({data})
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