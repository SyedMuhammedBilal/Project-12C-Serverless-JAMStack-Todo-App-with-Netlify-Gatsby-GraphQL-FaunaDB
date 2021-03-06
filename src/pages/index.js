import React, { useEffect, useState } from "react";
import axios from "axios";
import './index.css';
import './components/note.css';
import Note from './components/note.js';
import Form from './components/form.js';
import Loader from './components/Loader.js';

export default () => {
  const [status, setStatus] = useState("loading");
  const [notes, setNotes] = useState(null);
  const reloadNotes = () => setStatus('loading');
  useEffect(() => {
    let canceled = false;
    if (status != "loading") return;
    axios("/api/get-all-notes").then(result => {
      if (canceled === true) return;
      if (result.status != 200) {
        console.error("Error loading notes");
        console.error(result);
        return;
      }
      setNotes(result.data.notes);
      setStatus("loaded");
    });
    return () => {
      canceled = true;
    };
  }, [status]);
  
  console.table(notes);

  return (
    <>
    <div className='form'>
      <h1>Todo App</h1>
      <br/>
      <Form reloadNotes={reloadNotes}/>
      <br />
      <br />
      <h1>Todo List</h1>
    </div>
      {notes ? (
        <ul>
          {notes.map(note => (
            <div className='mobil' key={note._id}>
              <div className="blogs-cont">
                <div className="blogs-box">
                    <h1>Your Task:</h1>
                    <h2>{note.text}</h2>
                    <Note id={note._id} reloadNotes={reloadNotes} /> 
                </div> 
              </div>
            </div>
          ))}
        </ul>
      ) : (
        <Loader />
      )}
    </>
  )
};