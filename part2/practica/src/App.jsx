import { useState } from "react";
import Notes from "./components/Notes"


const App = ({ notes }) => {
  console.log('props2', notes);
  const [newNotes, setnewNotes] = useState(notes)
  const [aggNotes, setAggNotes] = useState('')
  const [showAll, setShowAll] = useState(true)
  // agregamos un controlador de eventos para agregar mas notas 
  //setnewNotes()
  //setAggNotes()
  const addNote = (e) => {
    e.preventDefault()
    console.log('button clicked', e.target);
    const noteObject = {
      id: newNotes.length + 1,
      content: aggNotes,
      important: Math.random() < 0.5,
    }
    setnewNotes(newNotes.concat(noteObject))
    setAggNotes('')
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
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note => (
          <Notes key={note.id} note={note} />
        ))}

      </ul>
      <form onSubmit={addNote}>
        <label htmlFor="note">Nueva nota:</label>
        <input id="note" type="text" value={aggNotes} onChange={handleNoteChange}/>
        <button type="submit">Save</button>
      </form>
    </div>
  )
}

export default App