import winston from "winston";
const {combine, timestamp, json} = winston.format;


/**
 * Logger centralizado hecho con Winston
 */
export const logger = winston.createLogger({
    level: "info",
    format: combine(timestamp(), json()),
    transports:[
        
        new winston.transports.File({filename: "logs/error.log", level: "error"}),
        
        new winston.transports.File({filename: "logs/combined.log"})
    ]
})