const server = require("./App/routes/index");
const keys = require("./App/config/keys");
const database = require("./App/config/db");

const Port = keys.PORT;

database()
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log(err);
  });

server.listen(Port, () => {
  console.log(`Server is running on port: ${Port}`);
});
