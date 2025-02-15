import { User } from "../models/no_sql/users.js";
import { handleHTTPError } from "../utils/handleError.js";
import { verifyToken } from "../utils/handleJWT.js";



export const authMiddleware = async (req, res, next) =>{
    try {
        
        if (!req.headers.authorization) {
            handleHTTPError(res, "No hay un token en el header", 401)
            return
        }

        const token = req.headers.authorization.split(" ").pop()
        const dataToken = await verifyToken(token)

        if (!dataToken._id) {
            handleHTTPError(res, "No hay un _id en el token", 401)
            return
        }

        const user = await User.findById(dataToken._id)
        req.user = user

        next()

    } catch (error) {
        handleHTTPError(res, "Error en authMiddleware", 401)
    }
}