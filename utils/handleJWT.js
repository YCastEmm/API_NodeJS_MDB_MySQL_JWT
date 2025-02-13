import jsonwebtoken from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET;


// Firma el token
export const tokenSign = async (user) => {
    const sign = await jsonwebtoken.sign(
        {
            _id: user._id,
            role: user.role,
        },
        JWT_SECRET,
        {
            expiresIn: "2h",
        }
    );
    return sign;
};


// Verifico el token firmado
export const verifyToken = async (tokenJWT) => {
    try {
        return jsonwebtoken.verify(tokenJWT, JWT_SECRET)
    } catch (error) {
        return null
    }
};
