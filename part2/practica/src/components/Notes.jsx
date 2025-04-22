const Notes = ({note, toggleImportance }) => {
    const label = note.important
      ? 'make not important' : 'make important'
    return (
      <div className="notes">
        <li>
          {note.content}          
          <button onClick={toggleImportance}> {label}</button>
        </li>
        
      </div>
    )
  }

export default Notes