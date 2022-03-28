const express = require('express');
const router = express.Router();

const courses = [
    { id: 1, name: 'course1'},
    { id: 2, name: 'course2'},
    { id: 3, name: 'course3'}
];

router.get('/', (req, res) => {
    res.send(courses);
});

router.post('/', (req, res) => {
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

router.get('/:id', (req, res) => {
    let course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('The course with the given ID was not found.');
    res.send(course);
    /* res.send(req.params.id); */
});

// multi parameter endpoint
router.get('/:year/:month', (req, res) => {
    res.send(req.params);

    // TO READ QUERY PARAMETERS 
    // /api/posts/2018/1?sortBy=name
    // sortBy is query parameter
    res.send(req.query);
});

router.put('/:id', (req, res) => {
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

router.delete('/:id', (req, res) => {
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

module.exports = router;