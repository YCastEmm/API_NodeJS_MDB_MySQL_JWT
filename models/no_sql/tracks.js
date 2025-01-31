import mongoose from "mongoose";

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

// mongoose.model("Track", TrackSchema) crea un modelo llamado Track basado en TrackSchema, y lo asocia con la colección "tracks" en MongoDB (Mongo pluraliza automáticamente el nombre del modelo).
export const Track = mongoose.model("Track", TrackSchema);
