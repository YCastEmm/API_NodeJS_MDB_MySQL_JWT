import { handleHTTPError } from "../utils/handleError.js";

export const checkRole = (roles) => (req, res, next) => {
    try {
        const { user } = req;
        
        const userRole = user.role

        const checkRoleValue =  roles.some((role) => userRole.includes(role))


        if (!checkRoleValue) {
            handleHTTPError(res, "Usuario no autorizado para realizar un POST", 401);
            return;
        }


        next();

    } catch (error) {
        handleHTTPError(res, "Error en checkrole", 403);
    }
};
