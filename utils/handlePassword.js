import bcryptjs from 'bcryptjs'


/**
 * Encripta una contraseña de texto plano
 * 
 * @param {string} plainPassword - Contraseña sin encriptar
 */
export const encrypt = async (plainPassword) =>{
    const hash = await bcryptjs.hash(plainPassword, 10)
    return hash
}

/**
 * Compara una contraseña sin encriptar con un hash encriptado.
 * Retorna `true` si coinciden, `false` en caso contrario.
 * 
 * @param {string} plainPassword - Contraseña sin encriptar
 * @param {string} hashPassword - Contraseña encriptada
 */
export const compare = async (plainPassword, hashPassword) =>{
    return await bcryptjs.compare(plainPassword, hashPassword)
}