const mongoose = require('mongoose');
const Joi = require('joi');
const express = require('express');
const app = express();
const genresRouter = require('./routes/genres');
const customersRouter = require('./routes/customers');

mongoose.connect('mongodb://localhost/vidly')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.log('Error:', err));


app.use(express.json());

// routes
app.use('/api/genres', genresRouter);
app.use('/api/customers', customersRouter);

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
