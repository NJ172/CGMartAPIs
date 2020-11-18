const Joi = require('joi');
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title :{type: String, required: true },
    category :{type: String, required: true },
    price : {type: Number, required: true},
    imageURL :{type: String, required: true },
    isActive:{ type: String, enum:['Y', 'N'], default: 'Y'}
});

const Product = mongoose.model('Product', productSchema);
function validateProduct(product){
    const schema = {
        title: Joi.string().required(),
        category: Joi.string().required(),
        price: Joi.number().required(),
        imageURL: Joi.string().required(),
        isActive : Joi.string().valid('Y','N')
    }
    return Joi.validate(product, schema);
}

exports.Product = Product;
exports.validate = validateProduct;
exports.ProductSchema = productSchema;