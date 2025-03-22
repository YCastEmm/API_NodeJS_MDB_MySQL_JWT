/**
 * Este archivo se encarga de cargar automáticamente todas las rutas definidas en archivos dentro del mismo directorio,
 * excluyendo "index.js". Importa dinámicamente cada módulo y lo monta en el router principal de Express.
 */

import express from "express";
import fs from "fs";
import { fileURLToPath, pathToFileURL } from "url";
import path from "path";

const router = express.Router();


// Obtiene la ruta del directorio actual a partir de import.meta.url
const PATH_ROUTES = path.dirname(fileURLToPath(import.meta.url));

// Le saca la extension al nombre del archivo y devuelve solo el primer elemento del array, descartando la extension
const removeExtension = (fileName) => fileName.split(".").shift();


const loadRoutes = async () => {
    try {
        // Leo los archivos del directorio y filtra "index.js" ya que no será una ruta
        const files = fs.readdirSync(PATH_ROUTES).filter(file => file !== "index.js");

        // Recorre cada archivo y lo importa dinámicamente
        for (const file of files) {
            const name = removeExtension(file); // Le saco la extension al file

            const modulePath = `./${file}`;  //Genero la ruta relativa para importar el modulo

            const module = await import(modulePath); // Importa el módulo dinámicamente por eso devuelve una promesa y requiere un await
            
            if (module.router) {
                router.use(`/${name}`, module.router); // Agrega la ruta al router

            } else {
                console.warn(`⚠️ No se encontró "router" en ${file}`);
            }
        }

        console.log("✅ Rutas cargadas correctamente.");
    } catch (error) {
        console.error("❌ Error cargando rutas:", error);
    }
};

// Carga las rutas antes de exportar el router
await loadRoutes();

export default router;
