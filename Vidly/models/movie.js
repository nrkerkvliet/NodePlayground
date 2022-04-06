const Joi = require('joi');
const mongoose = require('mongoose');
const {genreSchema} = require('./genre');

const Movie = mongoose.model('Movie', new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 255
    },
    genre:{
        type: genreSchema,
        required:true
    },
    numberInStock: {
        type: Number,
        requried: true,
        min: 0,
        max: 255
    },
    dailyRentalRate: {
        type: Number,
        requried: true,
        min: 0,
        max: 255
    }
}));
function validateMovie(movie)
{
    const schema = Joi.object({
        title: Joi.string().min(5).max(255).required(),
        genreId: Joi.string().required(),
        numberInStock: Joi.number().min(0).integer().required(),
        dailyRentalRate: Joi.number().min(0).required()
    })

    const result = schema.validate(movie);
    return result;
}

exports.Movie = Movie;
exports.validate = validateMovie;
