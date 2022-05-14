const { errorResponse } = require("../utils/response");

/**
 * @class ValidatorClass
 */

class Validations {
  static validateInput(schema, object) {
    const { error, value } = schema.validate(object);
    return { error, value };
  }

  static validate(schema) {
    return (req, res, next) => {
      const { error } = Validations.validateInput(schema, {
        ...req.body,
        ...req.query,
        ...req.params,
      });
      if (!error) {
        return next();
      }
      logger.error(error.details[0].message);
      errorResponse(res, 400, error.details[0].message);
    };
  }
}

module.exports = Validations;
