const Joi = require('joi');
const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
        /* enum: ['horror', 'action', 'drama', 'mystery', 'thriller', 'suspense'] */
    }
});

const Genre = mongoose.model('Genre', genreSchema);

function validateGenre(genre)
{
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required()
    })

    const result = schema.validate(genre);
    return result;
}

exports.genreSchema = genreSchema;
exports.Genre = Genre;
exports.validate = validateGenre;