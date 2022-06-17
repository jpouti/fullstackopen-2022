const Notification = ({ message }) => { // add styles
    if(message === null) {
        return null
    }

    return (
        <div>
            {message}
        </div>
    )
}

export default Notification