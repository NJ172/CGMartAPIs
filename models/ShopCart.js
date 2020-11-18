const Joi = require('joi');
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title :{type: String, required: true },
    category :{type: String, required: true },
    price : {type: Number, required: true},
    imageURL :{type: String, required: true },
    quantity : {type: Number, required: true, default: 1},
    isActive:{ type: String, enum:['Y', 'N'], default: 'Y'}
});

const shopCartSchema = new mongoose.Schema({
    dateCreated :{type: Date, required: true, default: Date.now },
    productsList :[productSchema],
    isActive:{ type: String, enum:['Y', 'N'], default: 'Y'}
});
const ShopCart = mongoose.model('ShopCart', shopCartSchema);

function validateShopCart(shopCart){
    return true;
}
exports.ShopCart = ShopCart;
exports.validate = validateShopCart;