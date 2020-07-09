const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const date = require(__dirname + "/date.js");

const port = 3000;
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.set('view engine', 'ejs');

const items = [];
const workItems = [];


app.get("/", function(req, res) {

  let day = date.getDate();

  res.render("app", {listTitle: day, items: items});
});

app.post("/", function(req, res) {

    let item = req.body.newItem;

    if (req.body.list === "Work") {
      workItems.push(item);
      res.redirect("/work");
    } else {
      items.push(item);
      res.redirect("/");
    }

});

app.get("/work", function(req, res) {
  res.render("app", {listTitle: "Work List", items: workItems});
});


app.get("/about", function(req, res) {
  res.render("about");
});

app.listen(port, function() {
  console.log("Server is running at port " + port);
});
