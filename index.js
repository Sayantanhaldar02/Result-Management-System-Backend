const app = require("./app");
const configuration = require("./config/config");
const port  = configuration.port;
const db_connection = require("./config/db_config");

db_connection(configuration.database)

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});