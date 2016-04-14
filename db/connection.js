// npm install --save mongoose and require
var mongoose = require("mongoose")

// establish a connection with MongoDB, below will create a new dbs AFTER you save data to it
mongoose.connect("mongodb://localhost/primaries")

var PrimarySchema = new mongoose.Schema(
  {
  state: String,
  delegates: Number,
  winner: String
  }
);

mongoose.model("Primaries", PrimarySchema)

module.exports = mongoose;
