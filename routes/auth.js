import express from "express";
import { validatorLoginUser, validatorRegisterUser } from "../validators/auth.js";
import { matchedData } from "express-validator";
import { encrypt, compare } from "../utils/handlePassword.js";
import { models } from "../models/index.js";

export const router = express.Router();

const { usersModel } = models


router.post("/login", validatorLoginUser, (req, res) => {});

router.post("/register", validatorRegisterUser, async (req, res) => {
    const validData = matchedData(req);
    const passwordHash = await encrypt(validData.password)
    const body = {...validData, password: passwordHash}
    const data = await usersModel.create(body)
    
    
    const userData = data.toObject(); // Convierto el documento de Mongoose en un objeto JavaScript plano, eliminando propiedades y métodos internos de Mongoose.
    delete userData.password; // Elimino la contraseña antes de enviarla en la respuestas
    res.send({ data: userData });
}, );
