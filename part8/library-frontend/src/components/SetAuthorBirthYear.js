import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { SET_BORN_YEAR, ALL_AUTHORS } from '../queries';

const SetAuthorBirthYear = () => {
  const [name, setName] = useState('');
  const [born, setBorn] = useState('');

  const result = useQuery(ALL_AUTHORS);

  const [setBornYear] = useMutation(SET_BORN_YEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  if (result.loading) {
    return null;
  }

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
        <select value={name} onChange={({ target }) => setName(target.value)}>
          {result.data.allAuthors.map((a) => (
            <option key={a.name} value={a.name}>
              {a.name}
            </option>
          ))}
        </select>
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
