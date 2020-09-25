const mongoose = require("mongoose");
const chalk = require("chalk");
const config = require("../config/app-config");

mongoose.connect(
  config.DBURL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  () => {
    console.log(chalk.yellow("connection to database successful!..."));
  }
);

module.exports = mongoose;
