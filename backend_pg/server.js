const express = require("express");

const db = require('./queries');

const app = express();
const port = 3001;

//these two lines make Network error disappear
var cors = require("cors");
app.use(cors());


//to get data from frontend
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});
  
  app.get('/', db.getNotes);
  app.post('/', db.createNote);
  app.put('/:id', db.updateNote);
  app.delete('/:id', db.deleteNote);
  
  app.listen(port, () => {
    console.log(`App running on port ${port}...`);
  });