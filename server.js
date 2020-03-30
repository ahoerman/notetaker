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

let savedNotes = JSON.parse(fs.readFileSync("./db.json", "utf8"));
console.log(savedNotes);

//Handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "views", "notes.html"));
});

app.get("/api/notes", function (req, res) {
    // return res.json(savedNotes);
    let options = {
      root: path.join(__dirname),
    }

    res.sendFile("db.json", options, function (err) {
      if (err) {
        next (err)
      } else {
        console.log("Sent db.json");
      }
    })
  })

app.post("/api/notes", function(req, res) {
    let newNote = req.body;
    console.log(newNote);
    savedNotes.push(newNote);
    console.log(savedNotes);
    fs.writeFile("db.json", JSON.stringify(savedNotes), (err) => {
        if (err) throw err;
        console.log('The note was written to file!');
        return res.status(200).end();
      });
  });

  app.delete("/api/notes/:id", function(req, res){
    const thisNote = req.params.id;
    const newNotes = savedNotes.filter(note => note.id !== thisNote);
    
    return newNotes;

    // return savedNotes.filter(function(){
    //   let NewArray = [];
    //     if (savedNotes.id !== thisNote){
    //       NewArray+= savedNotes
    //       console.log(NewArray);
    //     };
    //     return res.json(NewArray);
    // });
  });