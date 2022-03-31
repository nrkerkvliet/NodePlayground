const Joi = require('joi');
const express = require('express');
const router = express.Router('');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.log('Error:', err));

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        enum: ['horror', 'action', 'drama', 'mystery', 'thriller', 'suspense']
    }
});

const Genre = mongoose.model('Genre', genreSchema);

router.get('/', (req,res) => {
    res.send(genres);
});

router.post('/', async (req, res) => {
    const {error} = validateGenre(req.body);

    if(error) return res.status(400).send(error.details[0].message);

    await createGenre(req.body);

    async function createGenre(input) {
        try{
            const genre = new Genre(input);
            const result = await genre.save();
            res.json(result);
        } catch(err) {
            console.log(err);
            res.status(500).send('Error creating document: invalid genre.');
        } 
    }
});

router.get('/:id', (req,res) => {
    let genre = genres.find(c=> c.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send('The genre with the given ID was not found');

    res.send(genre)
});

router.put('/:id', async (req, res) => {
  /*   let genre = genres.find(c=> c.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send('The genre with the given ID was not found'); */

    const {error} = validateGenre(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    /* const genre = new Genre(req.body); */
    await updateGenre(req.params.id, req.body);
    async function updateGenre(id, genreInput) {
        try{
            console.log(genreInput);
            const genre = await Genre.findByIdAndUpdate(id , 
                {
                    $set: {
                        name: genreInput.name
                    }
                },
                {new: true, runValidators: true}
            );
            console.log(genre);
            res.json(genre);
        } catch(err){
            console.log(err);
            res.status(500).send('Server error: invalid genre.');
        }
     }


    /* genre.name = req.body.name;
    res.send(genre); */
});

router.delete('/:id', (req, res) => {
    let genre = genres.find(c=> c.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send('The genre with the given ID was not found');

    const index = genres.indexOf(genre);
    genres.splice(index,1);

    res.send(genre);
});


function validateGenre(genre)
{
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    })

    const result = schema.validate(genre);
    return result;
}


module.exports = router;