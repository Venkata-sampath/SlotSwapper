const {constants} = require("../constants");

const errorHandler = (err, req, res, next)=>{
    const statusCode = res.statusCode ? res.statusCode : 500;
    switch(statusCode){
        case constants.VALIDATION_ERROR: res.json({
            title: "VALIDATION_ERROR",
            message: err.message,
            stackTrace: err.stack,
        });
        break;
        case constants.UNAUTHORIZED: res.json({
            title: "UNAUTHORIZED",
            message: err.message,
            stackTrace: err.stack,
        });
        break;
        case constants.FORBIDDEN: res.json({
            title: "FORBIDDEN",
            message: err.message,
            stackTrace: err.stack,
        });
        break;
        case constants.NOT_FOUND: res.json({
            title: "NOT_FOUND",
            message: err.message,
            stackTrace: err.stack,
        });
        break;
        case constants.SEVER_ERROR: res.json({
            title: "SEVER_ERROR",
            message: err.message,
            stackTrace: err.stack,
        });
        break;
        default: res.json({
            message: "No Error All good!",
        })
        break;
    }
}

module.exports = errorHandler;