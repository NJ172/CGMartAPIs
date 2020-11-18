const winston=require('winston');
const mongoose = require('mongoose')

module.exports = function(){
    mongoose.connect('mongodb://localhost:3020/vidly',{
            useUnifiedTopology: true, 
            useNewUrlParser: true, 
            useCreateIndex:true})
    .then(()=> winston.info('Connected Successfully....'))
    //.catch((error)=>console.error(error.message))
}