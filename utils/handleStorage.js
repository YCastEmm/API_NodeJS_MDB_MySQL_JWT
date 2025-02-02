import multer from 'multer'

// Configuración del almacenamiento de archivos usando el método diskStorage de multer
const storage = multer.diskStorage({
    // Función que define el destino donde se guardará el archivo
    destination: function(req, file, callback){
        const pathStorage = "storage/" // Ruta donde se guardarán los archivos
        callback(null, pathStorage) // Se llama a la función callback con null como error y la ruta de destino
    },
    
    // Función que define el nombre del archivo a guardar
    filename: function(req, file, callback){
        const ext = file.originalname.split(".").pop() // Se obtiene la extensión del archivo (por ejemplo, "mp3")
        const filename = `file-${Date.now()}.${ext}` // Se genera un nombre único para el archivo usando la fecha actual (timestamp) y la extensión original
        callback(null, filename) // Se llama a la función callback con null como error y el nombre del archivo generado
    }
})

export const uploadMiddleware = multer({ storage }) 
