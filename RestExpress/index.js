require('dotenv').config();
//https://www.npmjs.com/package/config
const config = require('config');
const Joi = require('joi');
const express = require('express');
const app = express();
const helmet = require('helmet');
const coursesRouter = require('./routes/courses');
const homeRouter = require('./routes/home');
const logger = require('./middleware/logger');
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
// any route going to /api/courses should be handled by coursesRouter module
app.use('/api/courses', coursesRouter);
app.use('/', homeRouter);

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

/* 
app.get();
app.post();
app.put();
app.delete(); */


// attempt to read environmental variable or use port 3000
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});