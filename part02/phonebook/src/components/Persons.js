const Persons = (props) => {
    return (
        <>
        {props.personsToShow.map(person =>
            <div key={person.id}>
                <p>{person.name} {person.number}</p>
                <button onClick={() => props.handleDelete(person.id)}>delete</button>
            </div>
            )
        }
        </>
    )
}

export default Persons;