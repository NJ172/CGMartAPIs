const auth = require('../middleware/authorization');
const admin = require('../middleware/Adminstration');
//const asyncMiddleware = require('../middleware/async')
require('express-async-errors')
const {Genre, validate} = require('../models/genre');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) =>{
    // res.setHeader('Access-Control-Allow-Origin', '*');
    // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    const genres = await Genre.find().sort('name');
    res.send(genres);
});

router.post('/', auth,async (req, res) =>{
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let genre = new Genre({name : req.body.name});
    genre = await genre.save();
    res.send(genre);
});
router.put('/:id', async(req, res)=>{
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //const genre = await Genre.findByIdAndUpdate(req.params.id, {name: req.body.name});
});

router.delete('/:id', [auth, admin],async(req,res)=>{
    const genre = await Genre.findByIdAndRemove(req.params.id);
    if(!genre) return res.status(404).send('The genre with the given id doesnot Exist...');
    res.send(genre);
});
module.exports = router;