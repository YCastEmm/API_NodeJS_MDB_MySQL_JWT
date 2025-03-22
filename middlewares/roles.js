import { handleHTTPError } from "../utils/handleError.js";

/**
 * Middleware para verificar si el usuario tiene un rol autorizado.
 * @param {Array<string>} roles - Lista de roles permitidos
 */

export const checkRole = (roles) => (req, res, next) => {
    try {
        const user = req.user;

        if (!user || !user.role) {
            return handleHTTPError(res, "No se encontró información del usuario en la solicitud", 401);
        }

        const userRole = user.role;
        const isAuthorized = roles.some((role) => userRole.includes(role));

        if (!isAuthorized) {
            return handleHTTPError(res, "Acceso denegado: el rol del usuario no está autorizado", 403);
        }

        next();
    } catch (error) {
        handleHTTPError(res, "Error en el middleware de roles", 500);
    }
};
