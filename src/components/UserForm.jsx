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
  const [view, setView] = useState('user');
  const [errMessage, setErrMessage] = useState('');

  const url = 'https://frontend-take-home.fetchrewards.com/form';

  useEffect(() => { // API call to get data for populating dropdown options
    fetch(url)
      .then(res => res.json())
      .then(options => {setOptions(options)})
      .catch(err => {console.log('error:', err.message)});
    }, []);

  const handleSubmit = async e => {
    e.preventDefault(); // prevent page reload
    const formatted = { // remove whitespace
        name: name.trim(),
        email: email.trim(),
        password: password.trim(),
        state, // state and occupation don't need trimming
        occupation
    };
    if (formatted.name && formatted.email && formatted.password && occupation && state) { // if fields all filled, send post request
      setMissing([]); // clear missing fields so Notification component is not displayed
      if (!email.includes('@')) { // or regular expression for email address and .test() method
        setErrMessage('Enter a valid email address.');
        return;
      }
      const res = await fetch(url, { // make POST request
        method: 'POST',
        body: JSON.stringify(formatted),
        headers: { 'Content-Type': 'application/json' }
      });
      if (res.ok) { // if request successful, show success message; otherwise set error message
        setView('success')
      } else { // otherwise set error message to be displayed
        setErrMessage('An error occurred. Try again later.');
      }
    } else {
      const missing = []; // contains names of fields left empty by user; is passed into Notification component
      for (const field in formatted) {
        if (!formatted[field]) {
          missing.push(field);
        }
      }
      setMissing(missing); // set as state, so it can be passed into Notification component
    }
  };

  const showError = () => (
    <div className='notification'>
       <span className='red-text bold error-text'>{errMessage}</span>
    </div>
  );

  const showSuccess = () => (
      <div className='success'>
        <p className='center-text'>New user account created.</p>
        <button type='button' className='back-btn' onClick={() => setView('user')}>Back</button>
      </div>
  );

  const showForm = () => (
    <form onSubmit={e => handleSubmit(e)}>
      { missing.length > 0
          ? <Notification missing={missing} />
          : null }
      { errMessage ? showError() : null }
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

  return (
    <div>
      <h2 className='center-text'>Sign-Up</h2>
      { view === 'success'
          ? showSuccess()
          : showForm()
      }
    </div>
  );
};

export default UserForm;
