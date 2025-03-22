import { User } from "../models/no_sql/users.js";
import { handleHTTPError } from "../utils/handleError.js";
import { verifyToken } from "../utils/handleJWT.js";



export const authMiddleware = async (req, res, next) =>{
    try {
        
        if (!req.headers.authorization) {
            return handleHTTPError(res, "No se encontró un token en el encabezado de autorización", 401)
        }

        const token = req.headers.authorization.split(" ").pop()
        const dataToken = verifyToken(token)

        if (!dataToken || !dataToken._id) {
            return handleHTTPError(res, "El token proporcionado no contiene un identificador válido", 401)
        }

        const user = await User.findById(dataToken._id)
        req.user = user

        next()

    } catch (error) {
        handleHTTPError(res, "Error al validar la autenticación", 401)
    }
}