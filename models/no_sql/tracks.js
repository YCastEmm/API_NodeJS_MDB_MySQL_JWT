import mongoose from "mongoose";
import mongooseDelete from "mongoose-delete"; 
// mongoose-delete es un plugin para Mongoose que agrega la funcionalidad de eliminación lógica en los documentos de una base de datos MongoDB.
// En vez de borrar un documento de la base de datos, agrega un campo deleted y lo oculta en las consultas normales.


const TrackSchema = new mongoose.Schema(
    {
        name: {
            type: String,
        },
        album: {
            type: String,
        },
        cover: {
            type: String,
            validate: {
                validator: (req) => true, // Siempre devuelve true en este caso, por lo que no valida nada realmente
                message: "ERROR_URL",
            },
        },
        artist: {
            name: {
                type: String,
            },
            nickName: {
                type: String,
            },
            nationality: {
                type: String,
            },
        },
        duration: {
            start: {
                type: Number,
            },
            end: {
                type: Number,
            },
        },
        mediaId: {
            type: mongoose.Types.ObjectId,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

TrackSchema.plugin(mongooseDelete, {overrideMethods: "all"})

// mongoose.model("Track", TrackSchema) crea un modelo llamado Track basado en TrackSchema, y lo asocia con la colección "tracks" en MongoDB (Mongo pluraliza automáticamente el nombre del modelo).
export const Track = mongoose.model("Track", TrackSchema);
