import express from "express";
import "dotenv/config";
import cors from "cors";

console.clear()
const app = express()

app.use(cors())


const PORT = process.env.PORT

const server = app.listen(PORT, () => console.log(`El server está corriendo en el puerto ${PORT}`))

server.on("error", (error) => console.error(`Error al levantar el servidor: ${error}`))