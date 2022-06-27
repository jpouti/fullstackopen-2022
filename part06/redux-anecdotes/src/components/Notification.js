import { useSelector } from "react-redux"

const Notification = () => {
  const notification = useSelector(state => state.notification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  if (notification[0] === null) {
    return null
  }
  return (
    <div style={style}>
      {notification[0]}
    </div>
  )
}

export default Notification