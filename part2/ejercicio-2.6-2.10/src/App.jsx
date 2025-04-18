import { useState } from 'react'
import Personas from "./components/personas.jsx"
import Filter from "./components/filter.jsx"
import PersonForm from './components/formPersonas.jsx'

const App = () => {

  const [persons, setPersons] = useState([
    {
      name: 'Arto Hellas',
      number: '09991829021',
      id: 1
    },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [number, setNumber] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  const addPersona = (e) => {
    e.preventDefault()
    console.log('button clicked', e.target);
    const nameExists = persons.some(person => person.name.toLowerCase() === newName.toLowerCase())

    if (nameExists) {
      alert(`${newName} ya está en la agenda.`)
      return
    }
    const personObject = {
      name: newName,
      number: number,
      id: persons.length + 1
    }
    setPersons(persons.concat(personObject))
    setNewName('')
    setNumber('')
    
  }


  const handleNoteChange = (event) => {
    console.log('contr', event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    console.log('contr', event.target.value)
    setNumber(event.target.value)
  }
  const filter = (e) => {
      e.preventDefault()
      console.log('button clicked', e.target);
  }

  const filteredPersons = searchQuery
    ? persons.filter(p =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : persons




  return (
    <div>
      
      <h2>Phonebook</h2>
      <Filter searchQuery={searchQuery} setSearchQuery={setSearchQuery} filter={filter} />

      <h2>Add User</h2>
      <PersonForm addPersona={addPersona} handleNoteChange={handleNoteChange} newName={newName} handleNumberChange={handleNumberChange} number={number}/>
      
      <h2>Numbers</h2>
      <Personas persons={filteredPersons} />

      
    </div>
  )
}

export default App