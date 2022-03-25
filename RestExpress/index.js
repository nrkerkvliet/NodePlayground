require('dotenv').config();
//https://www.npmjs.com/package/config
const config = require('config');
const Joi = require('joi');
const express = require('express');
const app = express();
const helmet = require('helmet');

const logger = require('./logger');
/* 
console.log(`NODE_ENV is ${process.env.NODE_ENV}`); // undefined if not set

console.log(`app.get is ${app.get('env')}`); // returns development by default
 */

app.set('view engine', 'pug');
app.set('views', './views'); // this is a default setting and a the default option-- just here for education

// enable json
app.use(express.json());

// middleware for parsing http request with x-www-form-urlencoded data
// passing object with extended = true allows complex arrays etc to be parsed
app.use(express.urlencoded( {extended: true}));

// allows serving of static content such as css files
// there is a readme.txt file in the staticContent directory
// the readme can be navigated to directly with localhost:3000/readme.txt
app.use(express.static('staticContent'));

// https://github.com/helmetjs/helmet
// Helps secure your apps by setting various HTTP headers.
app.use(helmet());


app.use(logger);

console.log(`${process.env.NODE_ENV}`);
if(process.env.NODE_ENV !== 'production'){
    const morgan = require('morgan');
    //http://expressjs.com/en/resources/middleware/morgan.html
    //HTTP request logger.	
    app.use(morgan('tiny'));
   /*  console.log(`Morgan enabled:  environment is ${process.env.NODE_ENV}`); */
    //https://www.npmjs.com/package/debug
    const debug = require('debug')('app.*');
    debug('All debugging enabled');
    /* const sDebug = require('debug')('app:startup');
    const dbDebug = require('debug')('app:db');
    sDebug('Startup Debug enabled');
    dbDebug('DB Debug enabled.') */
}
console.log(`Application Name: ${config.get('name')}`);
console.log(`Application Name: ${config.get('mail.host')}`);

// custom-environment-variables maps the config to the environment variable
console.log(`Mail Pass: ${config.get('mail.password')}`);

app.use((req,res,next)=>{
    console.log('Authenticating...');
    next();
});

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
    res.render('index', {title:'My Express App',message:'Hello World'});
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