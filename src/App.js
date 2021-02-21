import React, { useState, useEffect } from 'react';
import List from './List';
import Alert from './Alert';

// Source: https://www.youtube.com/watch?v=a_7Z7C_JCyo

function App() {
  const [name, setName] = useState('');

  // This will eventually be stored in local storage:
  const [list, setList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  // State for editing the ID:
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: '', type: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if value is empty: '!name' -> if empty, display alert.
    if (!name) {
      // Disaply alert
    }
    // If there IS a value, AND if editing, then...
    else if (name && isEditing) {
      // Deal with Edit
    }
    // Add item to list
    else {
      // Show alert

      // Create new item.
      // We need a unique ID for each new item, so we're going to cheat here and use 'Date().getTime()' to do that:
      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);
      setName('');
    }
  };

  return (
    <section className='section-center'>
      <form className='grocery-form' onSubmit={handleSubmit}>
        {alert.show && <Alert />}
        <h3>Shopping List</h3>
        <div className='form-control'>
          <input
            type='text'
            className='grocery'
            placeholder='e.g. eggs'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type='submit' className='submit-btn'>
            {isEditing ? 'edit' : 'submit'}
          </button>
        </div>
      </form>
      <div className='grocery-container'>
        <List items={list} />
        <button className='clear-btn'>clear items</button>
      </div>
    </section>
  );
}

export default App;
