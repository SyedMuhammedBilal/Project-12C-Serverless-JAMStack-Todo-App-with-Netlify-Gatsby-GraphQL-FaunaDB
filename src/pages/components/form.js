import React, { useState } from "react";
import axios from "axios";
import '../index.css';

const Form = ({reloadNotes}) => {
  const [text, setText] = useState('');
  const handleSubmit = async event => {
    event.preventDefault();

    if(text === '') return;

    await axios.post('/api/create-note', { text });

    setText('');
    reloadNotes();
  } 

  return (
    <form className="Form" onSubmit={handleSubmit}>
      <h1>Add your todo</h1>
        <input
          className='inputBox'
          placeholder='Enter your todo...'
          value={text}
          onChange={event => setText(event.target.value)}
        ></input>
      <button className="sign-btn" type="submit">Add</button>
    </form>
  );
};

export default Form;