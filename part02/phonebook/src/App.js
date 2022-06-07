import { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import axios from 'axios';

const App = () => {
  const [persons, setPersons] = useState([
  ]) 
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addName = (event) => {
    event.preventDefault();
    if (checkDuplicates(newName).length > 0) {
      alert(`${newName} is already added to phonebook`);
    } else { // add new Person to persons if name doesn`t exist
      const nameObject = {
        name: newName,
        number: newNumber
      }
  
      setPersons(persons.concat(nameObject));
      setNewName('');
      setNewNumber('');
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

   // check persons matching for filtered text
   const personsToShow = persons.filter(person => person.name.match(search) || person.name.match(search.charAt(0).toUpperCase() + search.slice(1)));

  // check duplicates by name
  const checkDuplicates = (name) => {
    const duplicates = persons.filter(person => person.name === name);
    return duplicates;
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter search={search} handleSearchChange={handleSearchChange} />

      <h3>Add a new</h3>

      <PersonForm 
        addName={addName} name={newName} handleNameChange={handleNameChange} number={newNumber} handleNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>

      <Persons personsToShow={personsToShow} />
    </div>
  )
}

export default App;