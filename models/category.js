const Joi = require('joi');
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    categoryAcronym:{type: String, required: true },
    categoryDescription : {type: String, required: true},
    isActive:{ type: String, enum:['Y', 'N'], default: 'Y'}
});
const Category = mongoose.model('Category', categorySchema);

function validateCategory(category){
    const schema = {
        categoryAcronym : Joi.string().required(),
        categoryDescription : Joi.string().required(),
        isActive : Joi.string().valid('Y','N')
    }
    return Joi.validate(category, schema);
}

exports.Category = Category;
exports.validate = validateCategory;
