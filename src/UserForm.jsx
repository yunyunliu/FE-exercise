import React from 'react';
import { useState, useEffect } from 'react';

const UserForm = () => {
  const [options, setOptions] = useState(null);
  const url = 'https://frontend-take-home.fetchrewards.com/form';

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(options => {setOptions(options)})
      .catch(err => {console.log('error:', err.message)});
    }, []);

  return (
    <form className='gray-border'>
      <h2>Sign-Up</h2>
      <label htmlFor='name'> Full Name <span>*</span></label>
      <input id='name' className='gray-border' placeHolder='Name' required/>
      <label htmlFor='email'> Email <span>*</span></label>
      <input id='email' type='email' className='gray-border'  placeHolder='Email'  required/>
      <label htmlFor='pass'> Password  <span>*</span></label>
      <input id='pass' type='password' placeHolder='Password' required/>
      <label htmlFor='occupation'> Occupation <span>*</span></label>
      <select id='occupation' required>
        <option value=''>Select Occupation</option>
          { options
            ? options.occupations.map((occ, i) => (
              <option key={i} value={occ}>{occ}</option>
            ))
            : null
        }
      </select>
      <label htmlFor='state'>State <span>*</span></label>
      <select id='state' required>
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
