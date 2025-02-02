import express from "express";
export const router = express.Router()




router.get("/", (req, res) =>{
    const data = "ruta de storage"

    res.send(data)
})