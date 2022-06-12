import { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import contactService from './services/contacts';
import './index.css';

const Notification = ( props ) => {
  if (props.message === null) {
    return null
  }

  return (
    <div className={props.class}>
      {props.message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [search, setSearch] = useState('');
  const [ntfyMessage, setNtfyMessage] = useState(null);
  const [ntfyClass, setNtfyClass] = useState(null);

  useEffect(() => {
    contactService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
      .catch(error => {
        console.log('error loading contacts', error)
      })
  }, [])

  const addName = (event) => {
    event.preventDefault();
    if (checkDuplicates(newName).length > 0) {
      // confirm to update number if Person already exists in db
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const person = persons.find(p => p.name === newName)
        //const oldNumber = person.number; // save old number for notification
        const changedPerson = { ...person, number:newNumber}
        contactService
          .update(person.id, changedPerson)
          .then(updatedPerson => {
            setPersons(persons.map(p => p.id !== person.id ? p : updatedPerson))
            setNewName('')
            setNewNumber('')
            displayUpdateNumberMsg(newName, changedPerson.number, person.number)
          })
          .catch(error => {
            displayerErrorMsg(person.name);
            setPersons(persons.filter(p => p.id !== person.id))
          })
        
      } else {
        // display notification for no changes
        displayNoChange(newName);
      }
    } else { // add new Person to db directly if name doesn`t exist
      const nameObject = {
        name: newName,
        number: newNumber
      }
      contactService
        .create(nameObject)
        .then(newPerson => {
          setPersons(persons.concat(newPerson))
          setNewName('')
          setNewNumber('')
          displayAddPersonMsg(newName);
        })
        .catch(error => {
          displayValErrorMsg(error.response.data.error)
        })
    }
  }
  
  // delete contacts by their id
  const handleDelete = (id) => {
    const person = persons.find(p => p.id === id)
    if (window.confirm(`Delete ${person.name} ?`)) {
      contactService
        .deleteContact(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== person.id))
          displayDeletePersonMsg(person.name);
        })
        .catch(error => {
          displayerErrorMsg(person.name);
          setPersons(persons.filter(p => p.id !== person.id))
        })
    } 
  }

  // display notification for succesful event of adding person
  const displayAddPersonMsg = (name) => {
    setNtfyMessage(`Added ${name}`)
    setNtfyClass('succesfulEvent')
    setTimeout(() => {setNtfyMessage(null)}, 5*1000);
    setTimeout(() => {setNtfyClass(null)}, 5*1000);
  }

  // display notification for succesful event of updating contact number
  const displayUpdateNumberMsg = (name, newNumber, oldNumber) => {
    setNtfyMessage(`Replaced ${name}'s old number ${oldNumber} with a new number ${newNumber} `)
    setNtfyClass('succesfulEvent')
    setTimeout(() => {setNtfyMessage(null)}, 7.5*1000);
    setTimeout(() => {setNtfyClass(null)}, 7.5*1000);
  }

    // display notification for succesful event of deleting contact
  const displayDeletePersonMsg = (name) => {
    setNtfyMessage(`Deleted contact ${name} succesfully`)
    setNtfyClass('succesfulEvent')
    setTimeout(() => {setNtfyMessage(null)}, 5*1000);
    setTimeout(() => {setNtfyClass(null)}, 5*1000);
  }
  // display notification for no changes to contact details
  const displayNoChange = (name) => {
    setNtfyMessage(`No changes with contact ${name}`)
    setNtfyClass('succesfulEvent')
    setTimeout(() => {setNtfyMessage(null)}, 5*1000);
    setTimeout(() => {setNtfyClass(null)}, 5*1000);
  }

  // display error message
  const displayerErrorMsg = (name) => {
    setNtfyMessage(`Information of ${name} has already been removed from server`)
    setNtfyClass('errorMsg')
    setTimeout(() => {setNtfyMessage(null)}, 5*1000);
    setTimeout(() => {setNtfyClass(null)}, 5*1000);
  }

  //display validation error msg
  const displayValErrorMsg = (err) => {
    console.log(err)
    setNtfyMessage(`${err}`)
    setNtfyClass('errorMsg')
    setTimeout(() => {setNtfyMessage(null)}, 5*1000);
    setTimeout(() => {setNtfyClass(null)}, 5*1000);
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
      <Notification class={ntfyClass} message={ntfyMessage}/>
      <Filter search={search} handleSearchChange={handleSearchChange} />
      <h3>Add a new</h3>
      <PersonForm 
        addName={addName} 
        name={newName} 
        handleNameChange={handleNameChange} 
        number={newNumber} 
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow} handleDelete={handleDelete} />
    </div>
  )
}

export default App;