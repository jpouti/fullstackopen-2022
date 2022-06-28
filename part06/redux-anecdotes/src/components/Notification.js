//import { useSelector } from "react-redux"
import { connect } from "react-redux"

const Notification = (props) => {
  //const notification = useSelector(state => state.notification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  if (props.notification[0] === null) {
    return null
  }
  return (
    <div style={style}>
      {props.notification[0]}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)
export default ConnectedNotification
//export default Notification