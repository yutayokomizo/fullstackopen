import { useState, useEffect } from 'react';
import personService from './services/persons';

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

const SinglePerson = ({ person, handleDelete }) => {
  return (
    <p>
      {person.name} {person.number}{' '}
      <button onClick={handleDelete}>delete</button>
    </p>
  );
};

const Persons = ({ persons, handleDelete }) => {
  return (
    <>
      {persons.map((person) => (
        <SinglePerson
          key={person.name}
          person={person}
          handleDelete={() => handleDelete(person.id)}
        />
      ))}
    </>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    personService.getAll().then((data) => {
      setPersons(data);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();

    const personIndex = persons.findIndex((person) => person.name === newName);
    const personExists = personIndex !== -1;

    if (personExists) {
      const existing = persons[personIndex];
      const message = `${existing.name} is already added to phonebook, replace the old number with a new one?`;
      if (window.confirm(message)) {
        const updateData = { ...existing, number: newNumber };
        personService.update(existing.id, updateData).then((data) => {
          setPersons(
            persons.map((person) => (person.id === data.id ? data : person))
          );
          setNewName('');
          setNewNumber('');
        });
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
      };
      personService.create(newPerson).then((data) => {
        setPersons(persons.concat(data));
        setNewName('');
        setNewNumber('');
      });
    }
  };

  const personsToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  const handleDelete = (id) => {
    const personToDelete = persons.find((person) => person.id === id);

    if (window.confirm(`Delete ${personToDelete.name}?`)) {
      personService.deleteOne(id).then(() => {
        setPersons(persons.filter((person) => person.id !== id));
      });
    }
  };

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
      <Persons persons={personsToShow} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
