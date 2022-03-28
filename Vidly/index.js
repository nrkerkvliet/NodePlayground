const Joi = require('joi');
const express = require('express');
const app = express();
const genresRouter = require('./routes/genres');

app.use(express.json());

// routes
app.use('/api/genres', genresRouter);

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

function validateGenre(genre)
{
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    })

    const result = schema.validate(genre);
    return result;
}