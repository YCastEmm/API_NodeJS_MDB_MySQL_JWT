
import mongoose from "mongoose";
import mongooseDelete from "mongoose-delete"; 


const UserSchema = new mongoose.Schema(
    {
        username:{
            type: String
        },
        email:{
            type: String,
            unique: true
        },
        password:{
            type: String, 
            select: false // Evito que el password se incluya por defecto en las consultas de la base de datos. 
        },
        role:{
            type: ["user", "admin"],
            default: "user"
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
)

UserSchema.plugin(mongooseDelete, {overrideMethods: "all"})

// mongoose.model("User", UserSchema) crea un modelo llamado User basado en UserSchema, y lo asocia con la colección "users" en MongoDB (Mongo pluraliza automáticamente el nombre del modelo).
export const User = mongoose.model("User", UserSchema)