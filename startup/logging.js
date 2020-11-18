const winston = require('winston')
require('winston-mongodb')
require('express-async-errors')

module.exports=function(){
    
    process.on('uncaughtException', (ex)=>{
        console.log(ex);
        winston.error(ex.message, ex);
    })
    // winston.handleExceptions(
    //     new winston.transports.File({filename : 'handleExceptionlogfile.log'})
    // )
    process.on('uncaughtRejection', (ex)=>{
        throw ex;
    })
    winston.add(new winston.transports.File({filename : 'logfile.log'}));
    winston.add(new winston.transports.MongoDB({db : 'mongodb://localhost:3020/vidly', useUnifiedTopology: true}))

}