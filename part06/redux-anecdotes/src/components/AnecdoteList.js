import { likeAnecdote } from '../reducers/anecdoteReducer'
import { useSelector, useDispatch } from 'react-redux'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const handleVote = (id) => {
    dispatch(likeAnecdote(id))
  }

  // sorting anecdotes in descending order by votes
  const sortByVotes = () => {
    return anecdotes.sort((a, b) => b.votes - a.votes)
  }

  return (
    <div>
        {sortByVotes().map(anecdote =>
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