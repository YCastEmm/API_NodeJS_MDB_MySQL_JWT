export const customHeader = (req, res, next) =>{
    try {
        const apiKey = req.headers.api_key
        console.log(apiKey);
        if (apiKey === "api_key_ejemplo") {
            next()
        } else {
            res.status(403).send({error: "La API KEY no es la correcta"})
        }
    } catch (error) {
        res.status(403).send({error: "Error al obtener el custom header"})
    }
}