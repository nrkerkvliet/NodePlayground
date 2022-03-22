const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

let genres = [
    { id: 1, name: 'horror' },
    { id: 2, name: 'action' },
    { id: 3, name: 'drama' },
    { id: 4, name: 'suspense/thriller' },
];

app.get('/api/genres', (req,res) => {
    res.send(genres);
});

app.post('/api/genres', (req, res) => {
    const {error} = validateGenre(req.body);

    if(error) return res.status(400).send(error.details[0].message);

    const genre = {
        id: genres.length + 1,
        name: req.body.name
    };

    genres.push(genre);
    res.send(genre);
});

app.get('api/genres/:id', (req,res) => {
    let genre = genres.find(c=> c.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send('The genre with the given ID was not found');

    res.send(genre)
});

app.put('api/genres/:id', (req, res) => {
    let genre = genres.find(c=> c.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send('The genre with the given ID was not found');

    const {error} = validateGenre(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    genre.name = req.body.name;
    res.send(genre);
});

app.delete('api/genres/:id', (req, res) => {
    let genre = genres.find(c=> c.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send('The genre with the given ID was not found');

    const index = genres.indexOf(genre);
    genres.splice(index,1);

    res.send(genre);
});

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