/* function sayHello(name)
{
    console.log('Hello ' + name);   
}
global.setTimeout(() => {sayHello('Nate')},1000);
sayHello('Connor');
 */



// Node Module System
/* 
require('../ParentFolder/logger.js'); */
/* const logger = require('./logger.js');

logger.log('My Message'); */

/* 
// node.js built in module
// https://nodejs.org/dist/latest-v16.x/docs/api/path.html
const path = require('path');

// __filename comes from module wrapper function that node.js wraps all modules in
var pathObj = path.parse(__filename);

console.log(pathObj); */
// output:
/* {
    root: 'C:\\',
    dir: 'C:\\Users\\natek\\scrubdev\\Node',
    base: 'app.js',
    ext: '.js',
    name: 'app'
  } */
/* 
const osObj = require('os');

  var totalMemory = osObj.totalmem();
  var freeMemory = osObj.freemem();

   console.log('Total Memory:  ' + totalMemory);
  console.log('Free Memory:  ' + freeMemory); */
 /*  console.log(`Total Memory:  ${totalMemory}`);
  console.log(`Free Memory:  ${freeMemory}`);

  // output:

  Total Memory:  8474566656
Free Memory:  1211445248 */

/* const fs = require('fs');

// will return all files and folders in folder specified by paramter... in this instance the current folder
 const files = fs.readdirSync('./');
console.log(files); */

//output:
/*
[ 'app.js', 'logger.js' ]
*/

// function is async so need to pass callback in as second parameter
/* fs.readdir('$', function(err, files){
    if(err) console.log('Error', err);
    else console.log('Result',files);
}) */

 // EVENTS
// pull in the EventEmitter class
const EventEmitter = require('events');
// create object of EventEmitter class
const emitter = new EventEmitter(); 

// Register listener
//emitter.on('messageLogged', function(arg){
// ARROW FUNCTION replaces function keyword from above
emitter.on('messageLogged', (arg) => {
    console.log('Listener called', arg);
    // Output:
    //Listener called { id: 1, url: 'httpL//' }   
});


const log = require('./logger');
log.createMessage('message');
