import React from 'react';
import { useState, useEffect } from 'react';

import Notification from './Notification';

const UserForm = () => {
  const [options, setOptions] = useState(null);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [occupation, setOccupation] = useState('');
  const [state, setState] = useState('');

  const [missing, setMissing] = useState([]);
  // const [showError, setShowError] = useState(true);
  const [errMessage, setErrMessage] = useState('');

  const url = 'https://frontend-take-home.fetchrewards.com/form';

  useEffect(() => { // GET request to get data needed for populating state and occupation dropdowns
    fetch(url)
      .then(res => res.json())
      .then(options => {setOptions(options)})
      .catch(err => {console.log('error:', err.message)});
    }, []);

  const handleSubmit = async e => {
    e.preventDefault(); // prevent page reload
    if (name && email && password && occupation && state) { // if fields all filled, send post request
      setMissing([]); // clear missing fields so Notification component is not displayed
      const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({ name, email, password, occupation, state }),
        headers: { 'Content-Type': 'application/json' }
      });
      if (res.ok) {
        setErrMessage('');
        setName(''); // clear form fields
        setEmail('');
        setPassword('');
        setOccupation('');
        setState('');
      } else {
        setErrMessage('An error occurred. Try again later.');
      }
    } else {
      const missing = []; // contains names of fields left empty by user; is passed into Notification component
      const userData = { name, email, password, occupation, state };
      for (const field in userData) {
        if (!userData[field]) {
          missing.push(field);
        }
      }
      setMissing(missing);
    }
  }

  const ErrorMessage = () => (
    <div className='notification'>
       <span className='red-text bold error-text'>{errMessage}</span>
    </div>
  );

  return (
    <form onSubmit={e => handleSubmit(e)}>
      <h2>Sign-Up</h2>
      { missing.length > 0
          ? <Notification missing={missing} />
          : null }
      { errMessage ? ErrorMessage() : null }
      <label htmlFor='name'> Full Name <span>*</span></label>
      <input
        id='name'
        className='gray-border'
        placeholder='Name'
        value={name}
        onChange={({ target }) => {setName(target.value)}}
     />
      <label htmlFor='email'> Email <span>*</span></label>
      <input
        id='email'
        // type='email'
        className='gray-border'
        placeholder='Email'
        value={email}
        onChange={({ target }) => {setEmail(target.value)}}
     />
      <label htmlFor='pass'> Password  <span>*</span></label>
      <input
        id='pass'
        type='password'
        placeholder='Password'
        value={password}
        onChange={({ target }) => {setPassword(target.value)}}
      />
      <label htmlFor='occupation'> Occupation <span>*</span></label>
      <select
        id='occupation'
        value={occupation}
        onChange={({ target }) => {setOccupation(target.value)}}
      >
        <option value=''>Select Occupation</option>
          { options
            ? options.occupations.map((occ, i) => (
              <option key={i} value={occ}>{occ}</option>
            ))
            : null
          }
      </select>
      <label htmlFor='state'>State <span>*</span></label>
      <select
        id='state'
        value={state}
        onChange={({ target }) => { setState(target.value)}}
      >
        <option value=''>Select State</option>
          { options
            ? options.states.map(({ name, abbreviation }) => (
              <option key={abbreviation} value={abbreviation}>{name}</option>
            ))
            : null
          }
      </select>
      <button className='btn-submit'> Create Account</button>
    </form>
  );
};

export default UserForm;
