const Joi = require('joi');
const mongoose = require('mongoose');

const shoppingCartSchema = new mongoose.Schema({},{strict:false});

const ShoppingCart = mongoose.model('ShoppingCart', shoppingCartSchema);

function validaShoppingCart(shoppingCart){
    return true;
}

exports.ShoppingCart = ShoppingCart;
exports.validate = validaShoppingCart;
