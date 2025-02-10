import mongoose from "mongoose";
import mongooseDelete from "mongoose-delete"; 

const StorageSchema = new mongoose.Schema(
    {
        url: {
            type: String
        },
        filename: {
            type: String
        }
    },
    {
        timestamps: true, // Agrega createdAt y updatedAt automáticamente
        versionKey: false // Desactiva el campo __v de versiones en MongoDB
    }
);

StorageSchema.plugin(mongooseDelete, { overrideMethods: "all" }); // Agrega eliminación lógica al esquema

export const Storage = mongoose.model("Storage", StorageSchema); // Crea el modelo asociado a la colección "storages"
