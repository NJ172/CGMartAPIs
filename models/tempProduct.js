const Joi = require('joi');
const mongoose = require('mongoose');

const tempProductSchema = new mongoose.Schema({},{strict:false});

const TempProduct = mongoose.model('Orders', tempProductSchema);

function validatetempProduct(tempProduct){
    return true;
}

exports.TempProduct = TempProduct;
exports.validate = validatetempProduct;
