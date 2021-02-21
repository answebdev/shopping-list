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
  const [alert, setAlert] = useState({
    show: false,
    msg: '',
    type: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if value is empty: '!name'.
    // If value is empty, display alert.
    if (!name) {
      // Disaply alert
      // We can just use this 'setAlert' line, especially, if we only do this once here:
      // setAlert({ show: true, msg: 'please enter value', type: 'danger' });

      // But since we're going to use this logic elsewhere, we'll just create a function below (see 'showAlert' below),
      // and then just use it wherever we need it, such as here:
      showAlert(true, 'danger', 'please enter value');

      // Hide alert after 3 seconds.
      // This will be done with 'useEffect' in Alert.js.
      // This is passed in as a prop called 'removeAlert' from down below in the 'return'.
    }
    // If there IS a value, AND if user is editing, then edit.
    else if (name && isEditing) {
      // Deal with Edit
    }
    // If there is a value and user is NOT editing, create a new item
    // (with the properties of ID and Title), and add it to the list.
    else {
      // Show alert
      showAlert(true, 'success', 'item added to the list');

      // Create new item.
      // We need a unique ID for each new item, so we're going to cheat here and use 'Date().getTime()' to do that:
      const newItem = { id: new Date().getTime().toString(), title: name };
      // Grab the old values from the list ('...list'), and add the new item ('newItem').
      setList([...list, newItem]);
      // Clear the input field after submitting.
      setName('');
    }
  };

  // Create a function (show alert if submitted with empty input field) because this logic will be used in more than one place.
  const showAlert = (show = false, type = '', msg = '') => {
    setAlert({ show, type, msg });
  };

  // Clear items from list.
  const clearList = () => {
    showAlert(true, 'danger', 'empty list');

    // Clear all the values:
    setList([]);
  };

  return (
    <section className='section-center'>
      <form className='grocery-form' onSubmit={handleSubmit}>
        {/* By default, 'show' in 'showAlert' (see above) is false, so since this is passed into 'removeAlert' here, it will be 'false',
        which means it will not show, which is what we want for 'removeAlert', and which we will use in Alert.js in 'useEffect'
        to set the timer so that the alert is removed after 3 seconds. */}
        {alert.show && <Alert {...alert} removeAlert={showAlert} />}
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
      {list.length > 0 && (
        <div className='grocery-container'>
          {/* Pass in the 'list' as a prop into the List component - here, the prop is named 'items' (see List.js, where it's destructured).*/}
          <List items={list} />
          <button className='clear-btn' onClick={clearList}>
            clear items
          </button>
        </div>
      )}
    </section>
  );
}

export default App;
