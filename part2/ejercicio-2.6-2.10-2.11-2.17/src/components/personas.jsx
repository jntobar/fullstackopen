const Personas = ({ persons,handleDelete }) => {

    return (
        <ul>
            {persons.map((person) => (
                <li key={person.id}>
                    {person.name} — {person.number}
                    <button type="button" onClick={() => handleDelete(person.id, person.name)}> Eliminar</button>
                </li>
            ))}
        </ul>
    )
}
export default Personas