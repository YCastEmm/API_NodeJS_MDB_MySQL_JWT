import express from "express";
import { validatorLoginUser, validatorRegisterUser } from "../validators/auth.js";
import { AuthController } from '../controllers/auth.js'


export const router = express.Router();


// Ruta para registrar un usuario
router.post("/register", validatorRegisterUser, AuthController.registerController);


// Ruta para loguear un usuario
router.get("/login", validatorLoginUser, AuthController.loginController);

