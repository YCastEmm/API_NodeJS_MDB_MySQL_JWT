import { logger } from "./logger.js"

/**
 * Manejador de errores.
 * @param {Object} res 
 * @param {string} message 
 * @param {number} errorCode 
 */
export const handleHTTPError = ( res, message, errorCode) =>{
    logger.error(message)    
    res.status(errorCode).json({error: message})
}


