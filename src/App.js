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
    console.log('Hi there!');
  };

  return (
    <section className='section-center'>
      <form className='grocery-form' onSubmit={handleSubmit}>
        {alert.show && <Alert />}
      </form>
      <div className='grocery-container'>
        <List />
        <button className='clear-btn'>clear items</button>
      </div>
    </section>
  );
}

export default App;
