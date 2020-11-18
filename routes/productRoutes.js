const auth = require('../middleware/authorization');
const admin = require('../middleware/Adminstration');
require('express-async-errors');
const {Product, validate } = require('../models/product');
const express = require('express');
const router = express.Router();
const _ = require('lodash');

router.get('/', async(req, res)=>{
    let product = await Product.find().sort('category');
    res.send(product);
});
router.get('/:id', async(req, res)=>{
    const product = await Product.findById({_id : req.params.id}).sort('category');

    if(!product) return res.status(400).send('No Such product exists...');
    res.send(product);
});
router.post('/', async(req,res)=>{
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message)

    let product = await Product.findOne({title : req.body.title});
    if(product)  return res.status(400).send('Product already exists...');

    product = new Product(_.pick(req.body,['title', 'category', 
                    'price', 'imageURL','isActive']));
    product = await product.save();

    res.send(product);

});
router.put('/:id', async(req,res)=>{
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let product = await Product.findByIdAndUpdate(req.params.id,{
        title: req.body.title,
        category : req.body.category,
        price : req.body.price,
        imageURL : req.body.imageURL});

    if(!product) return res.status(400).send('No Such product exists...');

    res.send(product);
});

router.delete('/:id', async(req, res)=>{
    let product = await Product.findByIdAndRemove(req.params.id);
    if(!product) return res.status(400).send('No Such Product exists...');

    res.send(product);
});
module.exports = router;