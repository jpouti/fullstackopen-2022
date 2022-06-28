//import { useDispatch } from 'react-redux'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {

    //const dispatch = useDispatch()

    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        //dispatch(createAnecdote(content))
        //dispatch(setNotification(content, 5))
        props.createAnecdote(content)
        props.setNotification(`Created new anecdote: '${content}'`, 5)
    }

    return (
        <div>
        <h2>create new</h2>
        <form onSubmit={addAnecdote}>
          <div>
            <input name='anecdote'/>
          </div>
          <button type='submit'>create</button>
        </form>
      </div>
    )
}

const mapDispatchProps = {
    createAnecdote,
    setNotification
}

export default connect(
    null,
    mapDispatchProps
)(AnecdoteForm)
//export default AnecdoteForm