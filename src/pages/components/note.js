import React from "react";
import axios from "axios";
import './note.css'

const Note = ({ note, reloadNotes }) => {
  const handleDelete = () => {
    axios.post('/api/delete-note', { id: note._id}).then(reloadNotes);
  }

  return (
    <React.Fragment>
      <div className="blogs-cont">
        <div className="blogs-box">
            <h1>Your Task:</h1>
            <h2>{note}</h2>
            <button className='del-btn' onClick={handleDelete}>Delete</button>
        </div> 
      </div>
    </React.Fragment>
  )
};

export default Note;