require("dotenv").config();

module.exports = {
  TEST_DATABASE_URL: process.env.DATABASE_URL_TEST,
  DATABASE_URL: process.env.DATABASE_URL,
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
};
