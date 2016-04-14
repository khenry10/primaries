
var express      = require("express");
var mongoose     = require("./db/connection.js");
var hbs          = require("express-handlebars");
var parser       = require("body-parser");
var app          = express()

var Primaries    = mongoose.model("Primaries")

app.use("/assets", express.static("public"));
app.set("port", process.env.PORT || 3001)

app.set("view engine", "hbs");
app.engine(".hbs", hbs({
  extname:       ".hbs",
  partialsDir:   "views/",
  layoutsDir:    "views/",
  defaultLayout: "layout-main"
}));

app.use(parser.urlencoded({extended: true}));

// index view
app.get("/api", function(req, res){
  Primaries.find().then(function(primaries){
    res.json(primaries)
  });
});

// show page
app.get("/api/:state", function(req, res){
  Primaries.findOne({state: req.params.state}).then(function(primary){
    res.json(primary)
    });
  });

// update functionality on show
app.post("/:state", function(req, res){
  Primaries.findOneAndUpdate({state: req.params.state}, req.body.primary, {new: true}).then(function(primary){
    res.redirect("/" + primary.state)
  });
});

// delete functionality on show
app.post("/:state/delete", function(req, res){
  Primaries.findOneAndRemove({state: req.params.state}).then(function(){
    res.redirect("/")
  });
});

app.post("/", function(req, res){
  Primaries.create(req.body.primary).then(function(){
    res.redirect("/")
  });
});

app.get("/*", function(req, res){
  res.render("primary");
});

app.listen(app.get("port"), function(){
  console.log("I'm alive.")
});
