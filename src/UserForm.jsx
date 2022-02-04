import React from 'react';
import { useState, useEffect } from 'react';

const UserForm = () => {
  const [options, setOptions] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [occupation, setOccupation] = useState('');
  const [state, setState] = useState('');

  const url = 'https://frontend-take-home.fetchrewards.com/form';

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(options => {setOptions(options)})
      .catch(err => {console.log('error:', err.message)});
    }, []);

  return (
    <form>
      <h2>Sign-Up</h2>
      <label htmlFor='name'> Full Name <span>*</span></label>
      <input
        id='name'
        className='gray-border'
        placeHolder='Name'
        value={name}
        onChange={({ target }) => { setName(target.value)} }
        required />
      <label htmlFor='email'> Email <span>*</span></label>
      <input
        id='email'
        type='email'
        className='gray-border'
        placeHolder='Email'
        value={email}
        onChange={({ target }) => { setEmail(target.value)} }
        required />
      <label htmlFor='pass'> Password  <span>*</span></label>
      <input
        id='pass'
        type='password'
        placeHolder='Password'
        value={password}
        onChange={({ target }) => { setPassword(target.value)} }
        required />
      <label htmlFor='occupation'> Occupation <span>*</span></label>
      <select
        id='occupation'
        value={occupation}
        onChange={({ target }) => { setOccupation(target.value)} }
        required>
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
        onChange={({ target }) => { setState(target.value)} }
        required>
        <option value=''>Select State</option>
          { options
            ? options.states.map(({ name, abbreviation }) => (
              <option key={abbreviation} value={abbreviation}>{name}</option>
            ))
            : null
        }
      </select>
      <button class='btn-submit'>Create Account</button>
    </form>
  );
};


export default UserForm;
