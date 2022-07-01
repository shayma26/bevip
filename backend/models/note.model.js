const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  title: String,
  content: String
},{timestamps: true}
);

const Note = mongoose.model("Note", noteSchema);

/*const note1 = new Note({
  title: "My very first note",
  content:
    "Hellooo I will write here my beautiful bright ideas in my new brand web app",
});

const note2 = new Note({
  title: "My very second note",
  content:
    "Hellooo agaaiin I will write here my beautiful bright ideas in my new brand web app",
});

Note.insertMany([note1, note2], (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Notes successfully added");
  }
});*/

module.exports = Note;
