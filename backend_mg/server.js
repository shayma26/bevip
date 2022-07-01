const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const Note = require("./models/note.model");

const {
  createNote,
  getAllNotes,
  getNote,
  deleteNote,
  updateNote,
} = require("./controllers/noteController");

const app = express();

//these two lines make Network error disappear
var cors = require("cors");
app.use(cors());

const port = process.env.PORT || 3001;

//middleware if no use of body-parser
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//routes
app.get("/", getAllNotes);

app.get("/:id", getNote);

app.post("/", createNote);

app.delete("/:id", deleteNote);

app.patch("/:id", updateNote);

//connect to db
//***ON LOCAL***
mongoose.connect("mongodb://localhost:27017/brightideasDB", {
  useNewUrlParser: true,
});

// ***ON CLOUD***
/*
mongoose
  .connect(process.env.ATLAS_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => {
    //listen for requests
    app.listen(port, () => {
      console.log("DB connected and Server is running on 3001...");
    });
  })
  .catch((error) => {
    console.log(`Errors ${error.message}`);
  });*/

app.listen(port, () => {
  console.log("DB connected and Server is running on 3001...");
});
