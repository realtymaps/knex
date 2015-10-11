
// when used properly in an Error subclass, this provides a simple polyfill for v8's Error.captureStackTrace()

var captureStackTrace = function (error) {
  if (Error.captureStackTrace) {
    Error.captureStackTrace(error, error.constructor);
  }
  else {
    // handle non-v8 engines
    var err = new Error();
    if (!err.stack) {
      return null;
    }
    
    var stack = err.stack;

    // make this trace start with the error instantiation line, like a real Error
    var i = stack.indexOf(error.constructor.name);
    if (i != -1) {
      // remove lines up through this constructor call
      var eol = stack.indexOf('\n', i+1);
      stack = stack.substr(eol + 1);
      // prepend with the stringified error (usually a message line)
      stack = error.toString() + '\n' + stack;
    }

    error.stack = stack;
  }
};

module.exports = captureStackTrace;
