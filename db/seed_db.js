var mongoose = require("./connection.js");
var seeds = require("./seeds.json");

var Primary = mongoose.model("Primaries")

console.log("I am seeding the database for you.  Just one moment please...")

Primary.remove({}).then(function(){
  Primary.collection.insert(seeds).then(function(){
    process.exit();
  });
});
