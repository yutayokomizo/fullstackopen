import { useState } from 'react';

const Filter = ({ value, handleChange }) => {
  return (
    <>
      filter shown with <input value={value} onChange={handleChange} />
    </>
  );
};

const PersonForm = ({
  handleSubmit,
  nameInputValue,
  handleNameInput,
  numberInputValue,
  handleNumberInput,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        name: <input value={nameInputValue} onChange={handleNameInput} />
      </div>
      <div>
        number: <input value={numberInputValue} onChange={handleNumberInput} />
      </div>
      <div>
        <button type='submit'>add</button>
      </div>
    </form>
  );
};

const SinglePerson = ({ person }) => {
  return (
    <p>
      {person.name} {person.number}
    </p>
  );
};

const Persons = ({ persons }) => {
  return (
    <>
      {persons.map((person) => (
        <SinglePerson key={person.name} person={person} />
      ))}
    </>
  );
};

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

  const addPerson = (event) => {
    event.preventDefault();

    const personIndex = persons.findIndex((person) => person.name === newName);
    const personExists = personIndex !== -1;

    if (personExists) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
      };
      setPersons(persons.concat(newPerson));
      setNewName('');
      setNewNumber('');
    }
  };

  const personsToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        value={filter}
        handleChange={(event) => setFilter(event.target.value)}
      />
      <h2>add a new</h2>
      <PersonForm
        handleSubmit={addPerson}
        nameInputValue={newName}
        handleNameInput={(event) => setNewName(event.target.value)}
        numberInputValue={newNumber}
        handleNumberInput={(event) => setNewNumber(event.target.value)}
      />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} />
    </div>
  );
};

export default App;
