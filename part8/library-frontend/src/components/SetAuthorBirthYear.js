import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { SET_BORN_YEAR, ALL_AUTHORS } from '../queries';

const SetAuthorBirthYear = () => {
  const [name, setName] = useState('');
  const [born, setBorn] = useState('');

  const [setBornYear] = useMutation(SET_BORN_YEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    setBornYear({ variables: { name, setBornTo: Number(born) } });

    setName('');
    setBorn('');
  };

  return (
    <div>
      <h3>Set birthyear</h3>
      <form onSubmit={handleSubmit}>
        <div>
          name{' '}
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          born{' '}
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button>update author</button>
      </form>
    </div>
  );
};

export default SetAuthorBirthYear;
