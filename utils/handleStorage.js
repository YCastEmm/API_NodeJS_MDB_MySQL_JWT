import multer from 'multer'

/**
 * Configura el almacenamiento de archivos en disco usando Multer.
 * - Guarda los archivos en la carpeta local "storage/"
 * - Asigna un nombre único basado en la fecha actual y la extensión original
 * 
 * Este middleware se utiliza para manejar la subida de archivos desde el cliente.
 */
const storage = multer.diskStorage({
    // Define el directorio donde se guardarán los archivos
    destination: function(req, file, callback){
        const pathStorage = "storage/" // Ruta donde se guardarán los archivos
        callback(null, pathStorage) // Llamo a la función callback con null como error y la ruta de destino
    },
    
    // Define el nombre con el que se guardarán los archivos
    filename: function(req, file, callback){
        const ext = file.originalname.split(".").pop() 
        const filename = `file-${Date.now()}.${ext}` // Genero un nombre único para el archivo usando la fecha actual y la extensión original
        callback(null, filename) // Llamo a la función callback con null como error y el nombre del archivo generado
    }
})

export const uploadMiddleware = multer({ storage }) 
