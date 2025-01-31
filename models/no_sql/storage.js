
import mongoose from "mongoose";

const StorageSchema = new mongoose.Schema(
    {
        url:{
            type: String
        },
        filename:{
            type: String
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
)


// mongoose.model("Storage", StorageSchema) crea un modelo llamado Storage basado en StorageSchema, y lo asocia con la colección "storages" en MongoDB (Mongo pluraliza automáticamente el nombre del modelo).
export const Storage = mongoose.model("Storage", StorageSchema)