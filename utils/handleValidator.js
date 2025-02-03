import { validationResult } from "express-validator";

export const validateResult = (req, res, next) =>{
    try {
        validationResult(req).throw()
        return next()
    } catch (error) {
        res.status(403).send({errors: error.array()})
    }
}