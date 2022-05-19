const { ValidationException } = require("../exceptions/validationException");

// validator takes in a Joi object and validates as per the Joi object
// if any validation error occurs then validator throws the list of error with its message
const validator = (schema) => {
  return (req, res, next) => {
    try {
      // validate against request body and request params
      const { error, value } = schema.validate(
        {
          ...req.body, // to check request body
          ...req.params, // to check url parameters
          ...req.query, // to check url query
        },
        { abortEarly: false }
      );
      if (error) {
        let errorMessages = [];
        errorMessages = error.details.map((curr) => {
          return curr.message;
        });

        throw new ValidationException(errorMessages);
      }
      next(); // proceed if validation doesn't fail
    } catch (err) {
      next(err);
    }
  };
};

module.exports = { validator };
