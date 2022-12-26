const mongoose = require("mongoose");

const connectDB = (url) => {
  // returns a promise
  mongoose.set("strictQuery", true);
  return mongoose.connect(url);
};

module.exports = connectDB;
