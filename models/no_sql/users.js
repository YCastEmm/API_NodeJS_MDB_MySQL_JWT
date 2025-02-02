
import mongoose from "mongoose";


const UserSchema = new mongoose.Schema(
    {
        name:{
            type: String
        },
        age:{
            type: Number
        },
        email:{
            type: String,
            unique: true
        },
        password:{
            type: String
        },
        role:{
            type: ["user", "admin"], // Esto le asigna un tipo de dato enum, que en este caso admite valores "user" o "admin"
            default: "user"
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
)

// mongoose.model("User", UserSchema) crea un modelo llamado User basado en UserSchema, y lo asocia con la colección "users" en MongoDB (Mongo pluraliza automáticamente el nombre del modelo).
export const User = mongoose.model("User", UserSchema)