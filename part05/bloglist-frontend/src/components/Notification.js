const Notification = ({ message, styles }) => {
  if(message === '') {
    return null
  } else {
    return (
      <div className={styles}>
        {message}
      </div>
    )
  }
}

export default Notification