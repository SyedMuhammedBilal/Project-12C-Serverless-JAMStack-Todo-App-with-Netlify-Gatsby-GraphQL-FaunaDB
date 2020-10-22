import React from "react";
import axios from "axios";

const Note = ({ note, reloadNotes }) => {
  const handleDelete = () => {
    axios.post('/api/delete-note', { id: note._id}).then(reloadNotes);
  }

  return (
    <div> 
      <p>{note.text}</p>
      <button onClick={handleDelete}>Delete</button>
    </div>
  )
};

export default Note;