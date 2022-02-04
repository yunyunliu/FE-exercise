import React from 'react';

const Notification = ({ missing, setShow }) => {
  setTimeout(() => {setShow(false)}, 3000)
  return (
    <div className='notification'>
      <div className='red-text bold'>Missing required fields</div>
      <ul>
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
