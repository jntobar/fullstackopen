const Filter = ({ searchQuery, setSearchQuery, filter }) => {
    return (
        <div>
            <form onSubmit={filter}>
                <div>Buscar: <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} /></div>
            </form>


        </div>
    )
}
export default Filter