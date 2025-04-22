import { useState, useEffect } from "react";
import Notes from "./components/Notes"
//import axios from 'axios'
import noteService from './services/notes'
import Notification from "./components/alert";
import Footer from "./components/footer";

const App = () => {
  //console.log('props2', notes);
  const [newNotes, setnewNotes] = useState([])
  const [aggNotes, setAggNotes] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState('some error happened...')
  console.log(setErrorMessage,'nada')
  useEffect(() => {
    console.log('effect')
    noteService
      .getAll()
      .then(initialNotes => {
        setnewNotes(initialNotes)
      })
  }, [])
  //console.log('render', newNotes.length, 'notes')



  // agregamos un controlador de eventos para agregar mas notas 
  //setnewNotes()
  //setAggNotes()
  const addNote = (e) => {
    e.preventDefault()
    console.log('button clicked', e.target);
    const noteObject = {
      //id: newNotes.length + 1,
      content: aggNotes,
      important: Math.random() < 0.5,
    }
    noteService
      .create(noteObject)
      .then(returnedNote => {
        setnewNotes(newNotes.concat(returnedNote))
        setAggNotes('')
      })
 

  }

  const toggleImportanceOf = (id) => {
    console.log('importance of ' + id + ' needs to be toggled');
    //const url = `http://localhost:3001/notes/${id}`
    
    const note = newNotes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }
    noteService.update(id,changedNote)
    .then(returnedNote => {
      setnewNotes(newNotes.map(note => note.id !== id ? note : returnedNote))
    })
    .catch(error => {
      console.error(error); // ahora 'error' sí se usa
      setErrorMessage(
        `Note '${note.content}' was already removed from server`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      setnewNotes(newNotes.filter(n => n.id !== id))
    })


  }

  //agregamo un controlador de eventos que sincronice los cambios realizados en el input
  const handleNoteChange = (event) => {
    console.log('contr', event.target.value)
    setAggNotes(event.target.value)
  }

  //agregamos un componente para mostrar las notas
  const notesToShow = showAll
    ? newNotes
    : newNotes.filter(note => note.important)



  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />

      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note => (
          <Notes key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)} />
        ))}

      </ul>
      <form onSubmit={addNote}>
        <label htmlFor="note">Nueva nota:</label>
        <input id="note" type="text" value={aggNotes} onChange={handleNoteChange} />
        <button type="submit">Save</button>
      </form>
      <Footer/>
    </div>
  )
}

export default App