import React from 'react';

const Notification = ({ missing }) => {
  return (
    <div className='notification'>
      <div className='red-text bold'>Missing required fields</div>
      <ul className='note-list'>
        {
          missing.map(field => (
            <li className='red-text' key={field}>{field}</li>
          ))
        }
      </ul>
    </div>
  )
};

export default Notification;
