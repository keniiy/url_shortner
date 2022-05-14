const server = require("./app/routes/index");
const keys = require("./app/config/keys");
const database = require("./app/config/db");

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

// Unable to log into my free hosting account.
