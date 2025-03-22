import jsonwebtoken from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET;


/**
 * Genera un JWT firmado para un usuario
 * @param {Object} user - Usuario con al menos _id y role
 * @returns {string} Token JWT firmado
 */
export const tokenSign = (user) => {
    if (!user || !user._id || !user.role) {
        throw new Error("Faltan datos necesarios para generar el token");
    }

    return jsonwebtoken.sign(
        {
            _id: user._id,
            role: user.role,
        },
        JWT_SECRET,
        { expiresIn: "2h" }
    );
};


/**
 * Verifica un token JWT firmado
 * @param {string} tokenJWT - Token JWT recibido del cliente
 * @returns {Object|null} Payload decodificado o null si es inválido
 */
export const verifyToken = (tokenJWT) => {
    try {
        return jsonwebtoken.verify(tokenJWT, JWT_SECRET)
    } catch (error) {
        return null
    }
};
