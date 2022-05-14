const joi = require("joi");

class validationHelper {
  static numberCheck(param, min = 1) {
    return joi
      .number()
      .min(min)
      .integer()
      .strict()
      .required()
      .messages({
        "number.base": `${param} must be a number`,
        "number.min": `${param} must be greater than ${min}`,
        "number.integer": `${param} must be an integer`,
        "number.strict": `${param} must be a number`,
        "any.required": `${param} is required`,
      });
  }

  static editStringCheck(param, min = 1) {
    return joi
      .string()
      .min(min)
      .regex(/^[0-9a-zA-Z_]{4,}$/)
      .messages({
        "string.base": `${param} must be a string`,
        "string.min": `${param} must be greater than ${min}`,
        "any.required": `${param} is required`,
      });
  }

  static stringCheck(param, min = 1) {
    return joi
      .string()
      .min(min)
      .regex(/^[0-9a-zA-Z_]{4,}$/)
      .messages({
        "string.base": `${param} must be a string`,
        "string.min": `${param} must be greater than ${min}`,
        "any.required": `${param} is required`,
      });
  }

  static urlCheck(param) {
    return joi
      .string()
      .uri()
      .required()
      .uri()
      .messages({
        "string.uri": `${param} must be a valid url`,
        "any.required": `${param} is required`,
      });
  }
}

module.exports = validationHelper;
