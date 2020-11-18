const {User} = require('../models/user')
const config = require('config');
const jwt = require('jsonwebtoken');
const express = require('express');
const _ = require('lodash');
const router = express.Router();
const Joi = require('Joi');
const bcrypt= require('bcrypt');

router.post('/', async(req, res)=>{
    //res.setHeader('Access-Control-Allow-Origin', '*');
    // res.header("Access-Control-Allow-Headers", "x-auth-token");
    res.header("Access-Control-Expose-Headers", "x-auth-token");
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send('Invalid email or password...');

    const validUser = await bcrypt.compare(req.body.password, user.password);    
    if(!validUser) return res.status(400).send('Inavlid email or password...');

    const token = user.generateAuthToken()
    //await jwt.sign({_id:user._id}, config.get('jwtPrivateKey'));
    res.header('x-auth-token', token).send(_.pick(user,['_id','name','email']));
})

function validate(user){
    const schema = {
        email: Joi.string().min(5).max(255).required().email(),
        password : Joi.string().min(5).max(1024).required()
    }
    return Joi.validate(user, schema);
}

module.exports = router;