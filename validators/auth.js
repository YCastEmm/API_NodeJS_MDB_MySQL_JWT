import { check } from "express-validator";
import { validateResult } from "../utils/handleValidator.js";

export const validatorRegisterUser = [
    check("name").exists().notEmpty().isLength({ min: 3, max: 50 }),
    check("email").exists().notEmpty().isEmail(),
    check("password").exists().notEmpty().isLength({ min: 6, max: 30 }),
    (req, res, next) => {
        validateResult(req, res, next);
    },
];

export const validatorLoginUser = [
    check("email").exists().notEmpty().isEmail(),
    check("password").exists().notEmpty().isLength({ min: 6, max: 30 }),
    (req, res, next) => {
        validateResult(req, res, next);
    },
];
