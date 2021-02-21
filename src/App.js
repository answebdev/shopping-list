import React, { useState, useEffect } from 'react';
import List from './List';
import Alert from './Alert';

// Source: https://www.youtube.com/watch?v=a_7Z7C_JCyo

// Function for local storage so that the data persists in local storage when page is refreshed.
// See 'localStorage.setItem' down below in 'useEffect'.
const getLocalStorage = () => {
  // Get item from local storage.
  let list = localStorage.getItem('list');
  // If 'list' exists, it's going to be truthy, meaning it will be evaluated as 'true', so then we return it.
  // If not, then we return an empty array (we need to return something, so'll return an empty array).
  if (list) {
    // Since we're storing this as a string, we also need to parse it.
    // 'list' comes from below (see 'localStorage.setItem' down below in 'useEffect').
    return JSON.parse(localStorage.getItem('list'));
  } else {
    return [];
  }
};

function App() {
  const [name, setName] = useState('');

  // This will eventually be stored in local storage:
  // const [list, setList] = useState([]);
  const [list, setList] = useState(getLocalStorage());
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
      // Edit logic.
      // If the item ID matches the edit ID, then return all the properties (the ID),
      // and change the title (see if statement below).
      // If not, then just return the 'item'.
      setList(
        // Iterate over our list.
        list.map((item) => {
          if (item.id === editID) {
            // Copy all the values from the 'item', but change the title -
            // the title will now be equal to the 'name'.
            return { ...item, title: name };
          }
          return item;
        })
      );
      // Clear the input field after submitting.
      setName('');
      setEditID(null);
      setIsEditing(false);
      showAlert(true, 'success', 'value updated');
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

  const removeItem = (id) => {
    showAlert(true, 'danger', 'item removed');
    // If the item ID does NOT match, add it to the new array.
    // if it DOES match, then it will not get returned, and it will not be displayed.
    setList(list.filter((item) => item.id !== id));
  };

  const editItem = (id) => {
    // Get ID with matching ID.
    // If item ID maches, return that item
    const specificItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditID(id);
    // Display the item that is being edited.
    setName(specificItem.title);
  };

  // Local Storage Logic
  useEffect(() => {
    // We need to come up with a key name ('list'), because 'setItem' uses key-value pairs.
    // And we can only store it as a string, so we do 'JSON.stringify(list)'.
    // Every time we do something with the list, we wipe out the old values,
    // because essentially, we will overwrite and save the latest values of the 'list'.

    // And we also need to handle this when we initially set up the list (right now, it's an empty array -
    // see state above -> const [list...]: useState([]) - commented out code)
    localStorage.setItem('list', JSON.stringify(list));

    // Every time the 'list' changes, call 'localStorage'.
  }, [list]);

  return (
    <section className='section-center'>
      <form className='grocery-form' onSubmit={handleSubmit}>
        {/* By default, 'show' in 'showAlert' (see above) is false, so since this is passed into 'removeAlert' here, it will be 'false',
        which means it will not show, which is what we want for 'removeAlert', and which we will use in Alert.js in 'useEffect'
        to set the timer so that the alert is removed after 3 seconds. */}
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
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
          <List items={list} removeItem={removeItem} editItem={editItem} />
          <button className='clear-btn' onClick={clearList}>
            clear items
          </button>
        </div>
      )}
    </section>
  );
}

export default App;
