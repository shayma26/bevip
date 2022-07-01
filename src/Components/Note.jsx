import React, { useState, useRef } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import moment from 'moment';
import ContentEditable from "react-contenteditable";


function Note(props) {

  const title = useRef(props.title);
  const content = useRef(props.content);

  function deleteNote() {
    props.onDelete(props.id);
  }

  const handleTitleChange = evt => {
    title.current = evt.target.value;
};

const handleContentChange = evt => {
  content.current = evt.target.value;
};
  
  const handleTitleBlur = () => {
    title.current = title.current.replace("<h1>", '');
    title.current = title.current.replace("</h1>", '')
    props.onTitleBlur(props.id, title.current);
      //console.log(text.current);
  };

  const handleContentBlur = () => {
    content.current = content.current.replace("<p>", '');
    content.current = content.current.replace("</p>", '')
    props.onContentBlur(props.id, content.current);
      //console.log(text.current);
  };
  
  return (
    <div className="note">
      <ContentEditable html={"<h1>"+title.current+"</h1>"} onBlur={handleTitleBlur} onChange={handleTitleChange}/>
      <ContentEditable html={"<p>"+content.current+"</p>"} onBlur={handleContentBlur} onChange={handleContentChange}/>
        <span style={{color: "#ccc"}}>{moment(props.date).utc().format('DD/MM/YY')}</span>
      <button onClick={deleteNote}>
        <DeleteIcon />
      </button>
    </div>
  );
}

export default Note;
