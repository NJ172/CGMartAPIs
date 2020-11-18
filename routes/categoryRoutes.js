const auth = require('../middleware/authorization');
const admin = require('../middleware/Adminstration');
require('express-async-errors');
const {Category, validate } = require('../models/category');
const express = require('express');
const router = express.Router();
const _ = require('lodash');

router.get('/', async(req, res)=>{
    const category = await Category.find().sort('categoryDescription');
    res.send(category);
});
router.get('/:id', async(req, res)=>{
    const category = await Category.findById({_id : req.params.id}).sort('categoryDescription');

    if(!category) return res.status(400).send('No Such category exists...');
    res.send(category);
});
router.post('/',[auth,admin], async(req, res)=>{
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let category = await Category.findOne({categoryAcronym : req.body.categoryAcronym});
    if(category) return res.status(400).send('Category already exists...');

    category = new Category(_.pick(req.body, ['categoryAcronym', 
                        'categoryDescription','isActive']));
    category = await category.save();
    
    return res.send(category);
});

router.put('/:id',[auth, admin], async(req, res)=>{
    const { error } = validate(req.body);
    console.log(error);
    if(error)  return res.status(400).send(error.details[0].message);

    let category = await Category.findByIdAndUpdate(req.params.id, { 
        categoryAcronym: req.body.categoryAcronym, 
        categoryDescription : req.body.categoryDescription
        //isActive: req.body.isActive ? req.body.isActive : Category.isActive
    });
    if(!category) return res.status(400).send('No such category exists..')

    return res.send(category);
});

router.delete('/:id',[auth,admin], async(req, res) => {
    const category = await Category.findByIdAndRemove(req.params.id);
    if(!category) return res.send(400).send('Category with mention Id doesnot exists...');
    res.send(category);
});

module.exports = router;