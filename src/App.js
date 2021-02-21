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

  return <section className='section-center'>Shopping List App</section>;
}

export default App;
