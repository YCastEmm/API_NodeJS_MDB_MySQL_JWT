/**
 * Manejador de errores.
 * @param {Object} res 
 * @param {string} message 
 * @param {number} errorCode 
 */
export const handleHTTPError = ( res, message, errorCode) =>{
    res.status(errorCode).json({error: message})
}


