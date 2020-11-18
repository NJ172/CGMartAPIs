const Joi = require('joi');
const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
    name:{
        type: String, required: true, maxlength: 50, minlength: 5
    }
});
const Genre = new mongoose.model('Genre', genreSchema);
function validateGenre(genre){
    const schema ={
        name : Joi.string().min(3).required()
    };
    return Joi.validate(genre, schema);
}

exports.genreSchema = genreSchema;
exports.Genre= Genre;
exports.validate = validateGenre;