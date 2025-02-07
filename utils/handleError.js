
const handleHTTPError = (res, message, errorCode) =>{
    res.status(errorCode)
    res.send ({error: message})
}


export const handleError = {
    handleHTTPError,
}