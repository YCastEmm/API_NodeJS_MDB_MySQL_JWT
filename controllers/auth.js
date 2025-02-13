import { matchedData } from "express-validator";
import { encrypt, compare } from "../utils/handlePassword.js";
import { handleHTTPError } from "../utils/handleError.js";
import { models } from "../models/index.js";
import { tokenSign } from "../utils/handleJWT.js";

const { usersModel } = models;


// Registrar al usuario
const registerController = async (req, res) => {
    try {
        const validData = matchedData(req); // Obtengo solo los datos validados del request
        const passwordHash = await encrypt(validData.password); // Hasheo la contraseña
        const body = { ...validData, password: passwordHash }; // Reemplazo la contraseña original por la hasheada
        
        const createdUser = await usersModel.create(body); // Guardo el usuario en la base de datos
        
        const plainUser = createdUser.toObject(); // Convierto el documento de Mongoose en un objeto plano
        
        const authPayload = {
            token: await tokenSign(plainUser), // Genero el token con los datos del usuario
            user: plainUser, // Envío los datos del usuario
        };

        delete plainUser.password; // Elimino la contraseña antes de enviarla en la respuesta
        res.send({ data: authPayload }); // Respondo con el token y la info del usuario
    } catch (error) {
        handleHTTPError(res, "Error al registrar al usuario", 500); // Manejo errores generales
    }
};



// Loguear al usuario
const loginController = async (req, res) => {
    try {
        const validData = matchedData(req); // Obtengo solo los datos validados del request
        const user = await usersModel.findOne({ email: validData.email }).select("password role email name"); // Busco el usuario por email y traigo los campos necesarios con un select
        
        if (!user) {
            return handleHTTPError(res, "El usuario no se encuentra en la base de datos", 404); 
        }

        const hashPassword = user.get("password"); // Obtengo la contraseña hasheada de la BD
        const check = await compare(validData.password, hashPassword); // Comparo la contraseña ingresada con la almacenada
        
        if (!check) {
            return handleHTTPError(res, "La contraseña ingresada no es correcta", 401); 
        }

        const plainUser = user.toObject(); // Convierto el documento de Mongoose en objeto plano
        delete plainUser.password; // Elimino la contraseña antes de enviarla en la respuesta

        const data = {
            token: await tokenSign(plainUser), // Genero el token con los datos del usuario
            plainUser // Envío los datos del usuario sin la contraseña
        };

        res.send({ data }); // Respondo con el token y la info del usuario
    } catch (error) {
        handleHTTPError(res, "Error al loguear al usuario", 500);
    }
};




export const AuthController = {
    registerController,
    loginController,
};
