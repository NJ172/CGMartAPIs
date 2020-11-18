const auth = require('../middleware/authorization');
const admin = require('../middleware/Adminstration');
require('express-async-errors');
const {ShoppingCart, validate } = require('../models/shoppingCart');
const express = require('express');
const router = express.Router();
const _ = require('lodash');

router.get('/', async(req, res)=>{
    let shoppingCart = await ShoppingCart.find();
    res.send(shoppingCart);
});
router.get('/:id', async(req, res)=>{
    console.log(req.params.id);
    let shoppingCart = await ShoppingCart.findById(req.params.id);
    if(!shoppingCart) return res.status(404).send('No such shopping Cart exists...');

    res.send(shoppingCart);
})

router.post('/', async(req,res)=>{
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message)

    let shoppingCart = new ShoppingCart(req.body);
    shoppingCart = await shoppingCart.save();

    res.send(shoppingCart);
});
router.put('/:id/:product', async(req,res)=>{
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let shoppingCart = await ShoppingCart.findById(req.params.id);
    if(!shoppingCart) return res.status(400).send('No Such shopping Cart exists...');

    //await shoppingCart.products

    res.send(shoppingCart);
});
router.put('/:id', async(req,res)=>{
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let shoppingCart = await ShoppingCart.findByIdAndUpdate(req.params.id,req.body);

    if(!shoppingCart) return res.status(400).send('No Such shopping Cart exists...');

    res.send(shoppingCart);
});

router.delete('/:id', async(req, res)=>{
    let shoppingCart = await ShoppingCart.findByIdAndRemove(req.params.id);
    if(!shoppingCart) return res.status(400).send('No Such shopping Cart  exists...');

    res.send(shoppingCart);
});
module.exports = router;