//Dependecies
var express = require("express");
var path = require("path");
let fs = require("fs");

//Set up Express App
var app = express();
var PORT = process.env.PORT || 3000;

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });

//Handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/static', express.static('assets'))

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "notes.html"));
});

app.get("/api/notes", function(req, res) {
    fs.readFile('db.json', (err, data) => {
        if (err) throw err;
        return data;
      });;
});

app.post("/api/notes", function(req, res) {
    let newNote = req.body;
    console.log(newNote);
    fs.appendFile("db.json", JSON.stringify(newNote), (err) => {
        if (err) throw err;
        console.log('The note was appended to file!');
      });
  });

