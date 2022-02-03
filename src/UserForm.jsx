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
      <label htmlFor='name'> Full Name  </label>
      <input id='name' className='gray-border' required/>
      <label htmlFor='email'> Email </label>
      <input id='email' type='email' className='gray-border' required/>
      <label htmlFor='pass'> Password  </label>
      <input id='pass' type='password' required/>
      <label htmlFor='occupation'> Occupation </label>
      <select id='occupation' required>
        <option value=''>Select</option>
          { options
            ? options.occupations.map((occ, i) => (
              <option key={i} value={occ}>{occ}</option>
            ))
            : null
        }
      </select>
      <label htmlFor='state'>State</label>
      <select id='state' required>
        <option value=''>Select</option>
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
