const auth = require('../middleware/authorization');
const admin = require('../middleware/Adminstration');
require('express-async-errors');
const {ShopCart, validate } = require('../models/ShopCart');
const express = require('express');
const router = express.Router();
const _ = require('lodash');

router.get('/', async(req, res)=>{

    let shopCart = await ShopCart.find();
    res.send(shopCart);
});

router.get('/:id', async(req, res)=>{
    const shopCart = await ShopCart.findById({_id : req.params.id});

    if(!shopCart) return res.status(400).send('No Such ShopCart exists...');
    res.send(shopCart);
});

router.post('/', async(req,res)=>{

    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message)

    let shopCart = await ShopCart.findOne({_id : req.body._id});
    if(shopCart)  return res.status(400).send('ShopCart already exists...');

    shopCart = new ShopCart(_.pick(req.body,['productsList.title', 'productsList.category', 
                    'productsList.price', 'productsList.imageURL','productsList.quantity']));
    shopCart = await shopCart.save();

    res.send(shopCart);
});
router.put('/:id', async(req,res)=>{
    
    const { error } = validate(req.params);
    if(error) return res.status(400).send(error.details[0].message);

    // let shopCart = await ShopCart.findByIdAndUpdate(req.params.id,{
    //     dateCreated: req.body.dateCreated,
    //     productsList : req.body.productsList,
    //     quantity : req.body.quantity});
    
    let shopCart = await ShopCart.findOneAndUpdate({_id :req.params.id,"productsList.title" : req.body.title },
    {$set: {'productsList.$.quantity': req.body.quantity}});
    
    if(!shopCart) {
        shopCart = await ShopCart.findByIdAndUpdate(req.params.id, {
            $push:{"productsList": req.body}
        });
    }    
    if(!shopCart) return res.status(400).send('No Such shopCart exists...');

    res.send(shopCart);
});

router.delete('/:id', async(req, res)=>{
    console.log(req.params.id);
    let shopCart = await ShopCart.findByIdAndRemove(req.params.id);
    if(!shopCart) return res.status(400).send('No Such shopCart exists...');

    res.send(shopCart);
});
module.exports = router;