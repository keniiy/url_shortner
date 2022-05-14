const superTest = require("supertest");
const app = require("../../App/routes/index");
const database = require("../../App/config/db");

database();

const requester = superTest(app);

module.exports = {
  requester,
};
