const joi = require("joi");
const {
  numberCheck,
  editStringCheck,
  urlCheck,
} = require("../validationHelpers");

const shortenUrlSchema = joi.object({
  url: urlCheck("url"),
  shortCode: editStringCheck("shortCode"),
});

const shortenUrlParam = joi.object({
  shortCode: editStringCheck("shortCode", 6),
});

module.exports = {
  shortenUrlSchema,
  shortenUrlParam,
};
