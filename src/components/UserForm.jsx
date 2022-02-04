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

  const [showNote, setShowNote] = useState(false);
  const [noteTitle, setNoteTitle] = useState('');
  const [missing, setMissing] = useState(null);

  const url = 'https://frontend-take-home.fetchrewards.com/form';

  useEffect(() => { // GET request to get data needed for populating state and occupation dropdowns
    fetch(url)
      .then(res => res.json())
      .then(options => {setOptions(options)})
      .catch(err => {console.log('error:', err.message)});
    }, []);

  const validateData = formData => {
    const { name, email, password, occupation, state } = formData;
    if (!name || !email || !password || !occupation || !state ) {
      setShowNote(true);
      setNoteTitle('Missing required fields')
      const missing = [];
      for (const field in formData) {
        if (!formData[field]) {
          missing.push(field);
        }
      }
      setMissing(missing);
    }
  }

  const handleSubmit = async e => {
    e.preventDefault(); // prevent page reload
    const user = {
      name,
      email,
      password,
      occupation,
      state
    }
    validateData(user);

    const res = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: { 'Content-Type': 'application/json' }
    });

    if (res.ok) {
      setName(''); // clear form fields
      setEmail('');
      setPassword('');
      setOccupation('');
      setState('');
    }
  }

  return (
    <form onSubmit={e => handleSubmit(e)}>
      <h2>Sign-Up</h2>
      { showNote
          ? <Notification title={noteTitle} missing={missing} />
          : null }
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
        type='email'
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
