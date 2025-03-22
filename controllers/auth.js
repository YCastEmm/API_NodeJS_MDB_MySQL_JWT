import { matchedData } from "express-validator";
import { encrypt, compare } from "../utils/handlePassword.js";
import { handleHTTPError } from "../utils/handleError.js";
import { models } from "../models/index.js";
import { tokenSign } from "../utils/handleJWT.js";
import { handleResponse } from "../utils/handleResponse.js";

const { usersModel } = models;


// Registrar un usuario
const registerController = async (req, res) => {
    try {
        const validData = matchedData(req); 
        const passwordHash = await encrypt(validData.password); 
        const body = { ...validData, password: passwordHash }; 
        
        const createdUser = await usersModel.create(body); 
        console.log(typeof(createdUser))
        const plainUser = createdUser.toObject(); // Convierto el documento de Mongoose en un objeto plano
        
        const authPayload = {
            token: tokenSign(plainUser), // Genero el token con los datos del usuario
            user: plainUser, 
        };

        delete plainUser.password; // Elimino la contraseña antes de enviarla en la respuesta
        
        handleResponse(res, 200, "Se registró correctamente al usuario", authPayload)

    } catch (error) {
        handleHTTPError(res, "Error al registrar al usuario", 500); 
    }
};



// Loguear un usuario
const loginController = async (req, res) => {
    try {
        const validData = matchedData(req); 
        const user = await usersModel.findOne({ email: validData.email }).select("password role email name"); // Busco el usuario por email y traigo los campos necesarios con un select
        
        if (!user) {
            return handleHTTPError(res, "El usuario no se encuentra en la base de datos", 404); 
        }

        const hashPassword = user.get("password"); 
        const check = await compare(validData.password, hashPassword); 
        
        if (!check) {
            return handleHTTPError(res, "La contraseña ingresada no es correcta", 401); 
        }

        const plainUser = user.toObject(); // Convierto el documento de Mongoose en objeto plano
        delete plainUser.password; // Elimino la contraseña antes de enviarla en la respuesta

        const data = {
            token: tokenSign(plainUser), // Genero el token con los datos del usuario
            plainUser // Envío los datos del usuario sin la contraseña
        };

        handleResponse(res, 200, "Se logueo correctamente al usuario", data)
    } catch (error) {
        handleHTTPError(res, "Error al loguear al usuario", 500);
    }
};




export const AuthController = {
    registerController,
    loginController,
};
