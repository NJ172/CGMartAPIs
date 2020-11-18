const express = require('express')
const error= require('../middleware/error');
const users = require('../routes/userRoutes')
const auth = require('../routes/authRoutes');
const genre = require('../routes/genreRoutes');
const category = require('../routes/categoryRoutes');
const product = require('../routes/productRoutes');
const temProduct = require('../routes/temProductRoutes');
const shoppingCart = require('../routes/shoppingCartRoutes');
const shopCart = require('../routes/shopCartRoutes');

module.exports = function(app){
    app.use(express.json())
    app.use('/api/users', users);
    app.use('/api/auth', auth);
    app.use('/api/genre', genre);
    app.use('/api/category', category);
    app.use('/api/product', product);
    app.use('/api/tempProduct', temProduct);
    app.use('/api/shoppingCart', shoppingCart);
    app.use('/api/shopCart', shopCart);
    app.use(error);
}
