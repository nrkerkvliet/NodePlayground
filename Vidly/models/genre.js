const Joi = require('joi');
const mongoose = require('mongoose');

const Genre = mongoose.model('Genre', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
        /* enum: ['horror', 'action', 'drama', 'mystery', 'thriller', 'suspense'] */
    }
}));

function validateGenre(genre)
{
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    })

    const result = schema.validate(genre);
    return result;
}

exports.Genre = Genre;
exports.validate = validateGenre;