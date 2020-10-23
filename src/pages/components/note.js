import React from "react";
import axios from "axios";
import './note.css'

const Note = ({ id, reloadNotes }) => {
  const handleDelete = () => {
    axios.post('/api/delete-note', { id }).then(reloadNotes);
  }

  return (
    <React.Fragment>
        <button className='del-btn' onClick={handleDelete}>Delete</button>
    </React.Fragment>
  )
};

export default Note;