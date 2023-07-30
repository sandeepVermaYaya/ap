const HttpStatus = require('http-status');
const response = require('../response/index');


// Error response middleware for 404 not found.
exports.notFound = (req, res) => {

  return response.error({ msgCode: req.t('NOT_FOUND') }, res, HttpStatus.NOT_FOUND)

};

// Method not allowed error middleware.
exports.methodNotAllowed = (req, res) => {

  return response.error({ msgCode: req.t('INVALID_ROUTE') }, res, HttpStatus.METHOD_NOT_ALLOWED)
};

// Generic error response middleware for validation and internal server errors.
exports.genericErrorHandler = (err, req, res, next) => {
  // token
  let error;
  console.log(err);
  if (err.isJoi) {
    // Validation error
    error = {
      code: HttpStatus.BAD_REQUEST,
      message: HttpStatus[HttpStatus.BAD_REQUEST],
      details: err.details ?
        err.details.map((e) => ({
          message: e.message,
          param: e.path.join('.')
        })) :
        err.errors.map((e) => e.messages.join('. ')).join(' and ')
    };
  }
  else if (err.status === undefined && err.response && err.response.data) {
    ({ error } = err.response.data);
  }
  else if (err.status < 500) {
    error = {
      code: err.status,
      message: err.message
    };
    if (err.errors) {
      error.errors = err.errors;
    }
    else if (err.actionCode) {
      error.actionCode = err.actionCode;
    }
  }
  else {
    // Return INTERNAL_SERVER_ERROR for all other cases
    error = {
      code: HttpStatus.INTERNAL_SERVER_ERROR,
      message: HttpStatus[HttpStatus.INTERNAL_SERVER_ERROR]
    };
  }
  // return response.error({ msgCode: 'INVALID_ROUTE' }, res, HttpStatus.METHOD_NOT_ALLOWED)
  //

  // res.status(error.code).json({ error });
  return response.error({ msgCode: req.t(error.message) }, res, error.code)
};