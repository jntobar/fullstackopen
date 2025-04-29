import { useState, useEffect } from 'react'
import Personas from "./components/personas.jsx"
import Filter from "./components/filter.jsx"
import PersonForm from './components/formPersonas.jsx'
//import axios from 'axios'
import agendaService from './services/agenda.jsx'
import Notification from './components/alerta.jsx'

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [number, setNumber] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [notification, setNotification] = useState(null)
  const [notificationType, setNotificationType] = useState('success')
  useEffect(() => {
    agendaService
      .getAll().then(initialAgenda => {
        setPersons(initialAgenda)
      })
  }, [])



  const addPersona = (e) => {
    e.preventDefault()
    console.log('button clicked', e.target);

    // Traer la lista actualizada desde el servidor
    agendaService.getAll().then(serverPersons => {
      const nameExists = serverPersons.find(
        person => person.name.toLowerCase() === newName.toLowerCase()
      )

      const personObject = {
        name: newName,
        number: number,
        //id: persons.length + 1
      }
      



      if (nameExists) {
        const confirmUpdate = window.confirm(
          `${newName} ya está en la agenda. ¿Quieres reemplazar el número antiguo por uno nuevo?`
        )
        //console.log(confirmUpdate);

        if (confirmUpdate) {
          agendaService
            .update(nameExists.id, personObject)
            .then(updatedPerson => {
              setPersons(persons.map(p => p.id !== nameExists.id ? p : updatedPerson))
              setNotification(`Se actualizó el número de ${updatedPerson.name}`)
              setNotificationType('success')
              setNewName('')
              setNumber('')
              setTimeout(() => {
                setNotification(null)
                setNotificationType('success')
              }, 3000)
              return agendaService.getAll()
            })
            .catch(error => {
              console.log(error)
              setNotification(`Error: el contacto ya fue eliminado del servidor`)
              setNotificationType('error')
              setPersons(persons.filter(p => p.id !== nameExists.id))
              setTimeout(() => {
                setNotification(null)
                setNotificationType('success')
              }, 3000)
            })

        }
        return
      }
      



      agendaService
        .create(personObject)
        .then(retunedPerson => {
          setPersons(persons.concat(retunedPerson))
          setNewName('')
          setNumber('')
          setNotification(`Se agrego un nuevo número de ${retunedPerson.name}`)
          setNotificationType('success')
          setTimeout(() => {
            setNotification(null)
            setNotificationType('success')
          }, 3000)
        }
        )
        .catch(error => {
          console.log(error.response.data.error)
          setNotification(`Error al agregar: ${error.message}`)
          setNotificationType('error')
          setTimeout(() => {
            setNotification(null)
            setNotificationType('success')
          }, 2000)
        })


    })

    //setPersons(persons.concat(personObject))
    //setNewName('')
    //setNumber('')

  }


  const handleDelete = (id, name) => {
    const confirmDelete = window.confirm('¿Estás seguro de eliminar este contacto?')
    if (confirmDelete) {
      agendaService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
          setNotification(`Se eliminó a ${name} correctamente`)
          setNotificationType('success')
          setTimeout(() => {
            setNotification(null)
            setNotificationType('success')

            
          }, 2000)
        })
        .catch(error => {
          console.log(error)
          setNotification(`Error: el número de ${name} ya había sido eliminado del servidor`)
          setNotificationType('error')
          setTimeout(() => {
            setNotification(null)
            setNotificationType('success')
          }, 3000)
          setPersons(persons.filter(person => person.id !== id)) // limpiar igual
        })
    }
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
      <Notification message={notification} type={notificationType} />
      <Filter searchQuery={searchQuery} setSearchQuery={setSearchQuery} filter={filter} />

      <h2>Add User</h2>
      <PersonForm addPersona={addPersona} handleNoteChange={handleNoteChange} newName={newName} handleNumberChange={handleNumberChange} number={number} />

      <h2>Numbers</h2>
      <Personas persons={filteredPersons} handleDelete={handleDelete} />


    </div>
  )
}

export default App