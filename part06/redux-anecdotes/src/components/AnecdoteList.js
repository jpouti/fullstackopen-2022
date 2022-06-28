import { updateVoteAnecdote } from '../reducers/anecdoteReducer'
import { useSelector, useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()

  const handleVote = (id) => {
    const voted = anecdotes.find(a => a.id === id)
    dispatch(updateVoteAnecdote(voted))
    dispatch(setNotification(voted.content, 5))
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