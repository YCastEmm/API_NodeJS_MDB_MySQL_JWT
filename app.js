import express from "express";
import cors from "cors";
import "dotenv/config";

import { dbConnect } from "./config/mongoDB.js";
import router from "./routes/index.js";


const app = express();


app.use(cors());
app.use(express.json()) 
app.use(express.static("storage")) // le indico a Express que sirva archivos estáticos desde el directorio storage


app.use("/api", router);

dbConnect();

const PORT = process.env.PORT;

const server = app.listen(PORT, () => console.log(`El server está corriendo en el puerto ${PORT}`));

server.on("error", (error) => console.error(`Error al levantar el servidor: ${error}`));
