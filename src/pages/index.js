import React, { useEffect, useState } from "react";
import axios from "axios";
import './index.css';
import Note from './components/note.js';
import Form from './components/form.js';
import IdentityModal, { useIdentityContext } from "react-netlify-identity-widget"
import "react-netlify-identity-widget/styles.css"

export default () => {
  
  const [status, setStatus] = useState("loading");
  const [notes, setNotes] = useState(null);
  const reloadNotes = () => setStatus('loading');

  const identity = useIdentityContext()
  const [dialog, setDialog] = React.useState(false)
  const name =
    (identity && identity.user && identity.user.user_metadata && identity.user.user_metadata.full_name) || "NoName"
  const isLoggedIn = identity && identity.isLoggedIn
  
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

  return (
    <main>
      <h1>The TodoApp</h1>
      {identity && identity.isLoggedIn ? (
        <>
          <button className="login-btn" onClick={() => setDialog(true)}>
            {isLoggedIn ? `Hello ${name}, Log out here!` : "LOG IN"}
          </button>
          <Form reloadNotes={reloadNotes}/>
            {notes ? (
              <ul>
                {notes.map(note => (
                  <li key={note._id}>
                    <Note note={note} reloadNotes={reloadNotes}/>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Loading notes...</p>
            )}
        </>
      ) : (
        <button className="login-btn" onClick={() => setDialog(true)}>
          {isLoggedIn ? `Hello ${name}, Log out here!` : "LOG IN"}
        </button>
      )}
      <IdentityModal showDialog={dialog} onCloseDialog={() => setDialog(false)} />
    </main>
  )
}