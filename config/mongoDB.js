import mongoose from 'mongoose'


export const dbConnect = async () =>{

    const DB_URI = process.env.DB_URI

    try {
        await mongoose.connect(DB_URI)
        console.log("Se estableció la conexión con MongoDB")
        
    } catch (error) {
        console.error(`No se pudo conectar con MongoDB: ${error}`)
    }
}

