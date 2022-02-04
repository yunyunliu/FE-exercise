import React from 'react';

const Notification = ({ title, missing }) => {
  return (
    <div className='notification'>
      <div>{title}</div>
      <ul>
        {
          missing.map(field => (
            <li key={field}>{field}</li>
          ))
        }
      </ul>
    </div>
  )
};

export default Notification;
