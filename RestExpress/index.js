const Joi = require('joi');
const express = require('express');
const app = express();
// enable json
app.use(express.json());

const courses = [
    { id: 1, name: 'course1'},
    { id: 2, name: 'course2'},
    { id: 3, name: 'course3'}
];
/* 
app.get();
app.post();
app.put();
app.delete(); */

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.post('/api/courses', (req, res) => {
    const { error } = validateCourse(req.body);

    if(error) return res.status(400).send(error.details[0].message);
    /*
    if(!req.body.name || req.body.name.length < 3)
    {
        // 400 bad request for bad data posted to api
        res.status(400).send('Name is required and should be minimum 3 characters');
    }
    */
    
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

app.get('/api/courses/:id', (req, res) => {
    let course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('The course with the given ID was not found.');
    res.send(course);
    /* res.send(req.params.id); */
});

// multi parameter endpoint
app.get('/api/posts/:year/:month', (req, res) => {
    res.send(req.params);

    // TO READ QUERY PARAMETERS 
    // /api/posts/2018/1?sortBy=name
    // sortBy is query parameter
    res.send(req.query);
});

app.put('/api/courses/:id', (req, res) => {
    let course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('The course with the given ID was not found.');
    
    // this will get error property of object returned from validateCourse
    const { error } = validateCourse(req.body);

    if(error) {
        return res.status(400).send(error.details[0].message);
    }

    // update
    // return updated course
    course.name = req.body.name;
    res.send(course);
});

// attempt to read environmental variable or use port 3000
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

app.delete('/api/courses/:id', (req, res) => {
    let course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('The course with the given ID was not found.');

    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);
});

function validateCourse(course)
{
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });
    
    const result = schema.validate(course);
    return result;
}