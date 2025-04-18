const PersonForm = ({ addPersona, handleNoteChange, newName, handleNumberChange, number }) => {
    return (
        <form onSubmit={addPersona}>
            <div>Name: <input onChange={handleNoteChange} value={newName} /></div>
            <div>Number: <input onChange={handleNumberChange} value={number} /></div>
            <div>
                <button type="submit" >add</button>
            </div>
        </form>
    )

}
export default PersonForm