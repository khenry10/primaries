
var express      = require("express");
var mongoose     = require("./db/connection.js");
var hbs          = require("express-handlebars");
var parser       = require("body-parser");
var app          = express()

var Primaries    = mongoose.model("Primaries")

app.set("view engine", "hbs");
app.engine(".hbs", hbs({
  extname:       ".hbs",
  partialsDir:   "views/",
  layoutsDir:    "views/",
  defaultLayout: "layout-main"
}));

app.use(parser.urlencoded({extended: true}));

app.get("/", function(req, res){
  Primaries.find().then(function(primaries){
    res.render("primaries-index", {
      primaries
    });
  });
});

app.get("/:state", function(req, res){
  Primaries.findOne({state: req.params.state}).then(function(primary){
    res.render("primaries-show", {
      primary
    });
  });
});

app.listen(3001, function(){
  console.log("I'm alive.")
});
