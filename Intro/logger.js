var url = 'http://mylogger.io/log';

const EventEmitter = require('events');
class Logger extends EventEmitter
{
    log(message)
    {
        // Send an HTTP request
        console.log(message);

        // Raise an event -- pass object as parameter with the event
        this.emit('messageLogged', { id: 1, url: 'httpL//'});
    }
}



// exporting the log function making it available outside this module
module.exports = Logger;
// use this to export JUST the function and not a object
/* module.exports = log; */

/* module.exports.endPoint = url; */