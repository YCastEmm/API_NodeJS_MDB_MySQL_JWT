import express from "express";
import cors from "cors";
import "dotenv/config";


import { dbConnect } from "./config/mongoDB.js";
import router from "./routes/index.js";

const app = express();

app.use(cors());
app.use(express.json()) // Permite manejar cuerpo de solicitudes en formato JSON



app.use("/api", router);

dbConnect();

const PORT = process.env.PORT;

const server = app.listen(PORT, () => console.log(`El server está corriendo en el puerto ${PORT}`));

server.on("error", (error) => console.error(`Error al levantar el servidor: ${error}`));
