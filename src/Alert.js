import React, { useEffect } from 'react';

// These properties (type, msg) passed in come from the Alert state value in App.js (see state in App.js)
// (the options for type (alert type) are 'danger' and 'success').
// 'removeAlert' comes from inside the 'return' in App.js.
const Alert = ({ type, msg, removeAlert, list }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      // Call 'removeAlert' inside of the callback function:
      removeAlert();
      // Run callback function after 3 seconds.
    }, 3000);
    // Clean up function:
    return () => clearTimeout(timeout);

    // We want this to happen when the component renders, so use an empty dependency: []
  }, [list]);
  return <p className={`alert alert-${type}`}>{msg}</p>;
};

export default Alert;
