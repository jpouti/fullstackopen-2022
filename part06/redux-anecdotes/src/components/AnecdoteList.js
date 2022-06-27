import { voteAnecdote } from '../reducers/anecdoteReducer'
import { useSelector, useDispatch } from 'react-redux'
import { createNotification, hideNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()

  const handleVote = (id) => {
    dispatch(voteAnecdote(id))
    const voted = anecdotes.find(a => a.id === id)
    // set notification
    dispatch(createNotification(`You voted '${voted.content}'`))
    setTimeout(() => {
        dispatch(hideNotification())
    }, 5000);
  }

  // sorting anecdotes in descending order by votes
  const sortByVotes = () => {
    const anecdotesForSort = [...anecdotes]
    return anecdotesForSort.sort((a, b) => b.votes - a.votes)
  }

  // return anecdotes containing filter string
  const filterAnecdotes = () => {
    const anecdotes = sortByVotes()
    if (filter === '') {
        return anecdotes
    } else {
        return anecdotes.filter(
            a => a.content.includes(filter)
        )
    }
  }

  return (
    <div>
        {filterAnecdotes().map(anecdote =>
        <div key={anecdote.id}>
            <div>
            {anecdote.content}
            </div>
            <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote.id)}>vote</button>
            </div>
        </div>
        )}
    </div>
  )
}

export default AnecdoteList