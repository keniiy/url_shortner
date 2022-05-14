const mongoose = require("mongoose");

const { TEST_DATABASE_URL, DATABASE_URL } = require("./keys");

const mongooseConnection = () => {
  let mongoUrl;
  if (process.env.NODE_ENV === "test") {
    mongoUrl = TEST_DATABASE_URL;
  } else if (process.env.NODE_ENV === "development") {
    mongoUrl = DATABASE_URL;
  }
  return mongoose.connect(mongoUrl, {
    useNewURlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = mongooseConnection;
