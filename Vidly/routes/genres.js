const express = require('express');
const router = express.Router('');

let genres = [
    { id: 1, name: 'horror' },
    { id: 2, name: 'action' },
    { id: 3, name: 'drama' },
    { id: 4, name: 'suspense/thriller' },
];

router.get('/', (req,res) => {
    res.send(genres);
});

router.post('/', (req, res) => {
    const {error} = validateGenre(req.body);

    if(error) return res.status(400).send(error.details[0].message);

    const genre = {
        id: genres.length + 1,
        name: req.body.name
    };

    genres.push(genre);
    res.send(genre);
});

router.get('/:id', (req,res) => {
    let genre = genres.find(c=> c.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send('The genre with the given ID was not found');

    res.send(genre)
});

router.put('/:id', (req, res) => {
    let genre = genres.find(c=> c.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send('The genre with the given ID was not found');

    const {error} = validateGenre(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    genre.name = req.body.name;
    res.send(genre);
});

router.delete('/:id', (req, res) => {
    let genre = genres.find(c=> c.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send('The genre with the given ID was not found');

    const index = genres.indexOf(genre);
    genres.splice(index,1);

    res.send(genre);
});

module.exports = router;