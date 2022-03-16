const EventEmitter = require('events');
const emitter = new EventEmitter();

var url = 'http://mylogger.io/log';

function createMessage(message)
{
    // Send an HTTP request
    console.log(message);

    // Raise an event -- pass object as parameter with the event
    emitter.emit('messageLogged', { id: 1, url: 'httpL//'});

}


// exporting the log function making it available outside this module
module.exports.createMessage = createMessage;

// use this to export JUST the function and not a object
/* module.exports = log; */

/* module.exports.endPoint = url; */