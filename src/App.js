import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Note from "./Components/Note";
import CreateArea from "./Components/CreateArea";

function App() {
  const [notes, setNotes] = useState([]);

  const url = "http://localhost:3001/";
  
  async function fetchNotes(){
    axios
      .get(url)
      .then((resp) => {
        setNotes(resp.data);
      })
      .catch((error) => console.log("error occured: " + error.message));
  }
 
  useEffect(() => {
    fetchNotes();
  }, []);

  function addNote(newNote) {
   
    axios
      .post(url, newNote)
      .then((resp) => {
        setNotes((prevNotes) => {
          return [...prevNotes, newNote];
        });
      })
      .catch((error) => console.log("error occured: " + error.message));
  
  }

  function deleteNote(id) {

    axios
      .delete(`${url}${id}`)
      .then(() => {
        setNotes((prevNotes) => {
          return prevNotes.filter((noteItem) => {
            return noteItem.id !== id;
          });
        });
      })
      .catch((error) => console.log("error occured " + error.message));
  }

  function editTitleNote(id, titletext) {
    axios
      .put(`${url}${id}`, {title: titletext})
      .then(() => {
        setNotes((prevNotes) => {
          return prevNotes.map(object => {
            if (object.id === id) {
              return {...object, title: titletext};
            }
            return object;
          });
        });

      })
      .catch((error) => console.log("error occured " + error.message));

  }

  function editContentNote(id, contenttext) {
    axios
      .put(`${url}${id}`, {content: contenttext})
      .then(() => {
        setNotes((prevNotes) => {
          return prevNotes.map(object => {
            if (object.id === id) {
              return {...object, content: contenttext};
            }
            return object;
          });
        });
      })
      .catch((error) => console.log("error occured " + error.message));

  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes &&
        notes.map((noteItem, index) => {
          return (
            <Note
              key={noteItem.id}
              id={noteItem.id}
              title={noteItem.title}
              content={noteItem.content}
              date={noteItem.updatedAt}
              onDelete={deleteNote}
              onTitleBlur={editTitleNote}
              onContentBlur={editContentNote}
            />
          );
        })}

      <Footer />
    </div>
  );
}

export default App;
