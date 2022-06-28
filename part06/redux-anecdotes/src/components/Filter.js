//import { useDispatch } from "react-redux"
import { connect } from "react-redux"
import { setFilter } from "../reducers/filterReducer"

const Filter = (props) => {

    //const dispatch = useDispatch()

    const handleChange = (event) => {
      // input-field value is in variable event.target.value
     props.setFilter(event.target.value)
    }
    const style = {
      marginBottom: 10
    }
  
    return (
      <div style={style}>
        filter <input onChange={handleChange} />
      </div>
    )
  }
  
  const mapDispatchProps = {
    setFilter
  }

    export default connect(
        null,
        mapDispatchProps
    )(Filter)
  //export default Filter