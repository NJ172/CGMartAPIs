const auth = require('../middleware/authorization');
const admin = require('../middleware/Adminstration');
require('express-async-errors');
const {TempProduct, validate } = require('../models/tempProduct');
const express = require('express');
const router = express.Router();
const _ = require('lodash');

router.get('/', async(req, res)=>{
    let product = await TempProduct.find();
    res.send(product);
});
router.get('/:id', async(req, res)=>{
    let product = await TempProduct.findById(req.params.id);
    if(!product) return res.status(404).send('No such product exists...');

    res.send(product);
})

router.post('/', async(req,res)=>{
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message)

    // let product = await Product.findOne({productName : req.body.productName});
    // if(product)  return res.status(400).send('Product already exists...');

    // product = new Product(_.pick(req.body,['productName', 'productDescription', 
    //                 'price', 'imageURL','isActive']));
    let product = new TempProduct(req.body);
    product = await product.save();

    res.send(product);

});
router.put('/:id', async(req,res)=>{
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let product = await TempProduct.findByIdAndUpdate(req.params.id,{
        title: req.body.title,
        category : req.body.category,
        price : req.body.price,
        imageURL : req.body.imageURL});

    if(!product) return res.status(400).send('No Such product exists...');

    res.send(product);
});

router.delete('/:id', async(req, res)=>{
    let product = await TempProduct.findByIdAndRemove(req.params.id);
    if(!product) return res.status(400).send('No Such Product exists...');

    res.send(product);
});
module.exports = router;