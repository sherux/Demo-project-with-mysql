const { createConnection } = require("mysql2");
require("dotenv").config();

const db = createConnection({
  host: process.env.host,
  user: process.env.user,
  port: process.env.port,
  database: "USERINFORMATION",
  password: process.env.password,
});
db.connect((err) => {
  if (err) throw err;
  console.log("Connection has been established successfully");
});

module.exports = db;
