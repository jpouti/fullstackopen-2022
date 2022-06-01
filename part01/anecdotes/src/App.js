import { useState, useEffect } from 'react';

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Anecdote = (props) => {
  return (
    <div>
      <p>{props.anecdotes[props.selected]}</p>
      <p>has {props.votes[props.selected]} {props.votes[props.selected] !== 1 ? `votes`
       : `vote`} </p>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
   
  const points = Array(7).fill(0);
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(points);
  const [mostVotes, setMostVotes] = useState(0); // index from most voted anecdote

  const selectRandom = () => {
    let random = Math.floor(Math.random() * 7);
    while (random === selected) {
      random = Math.floor(Math.random() * 7);
    }
    setSelected(random);
  }

  const vote = (index) => {
    const copy = [...votes];
    copy[index] += 1;
    setVotes(copy);
  }

  // check most voted anectodes and set it for mostVotes state
  useEffect(() => {
    const index = votes.indexOf(Math.max(...votes));
  
    setMostVotes(index);

  }, [votes])
  

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote anecdotes={anecdotes} votes={votes} selected={selected}/>
      <div className='btns'>
        <Button handleClick={() => vote(selected)} text="Vote"></Button>
        <Button handleClick={selectRandom} text="Next Anecdote"></Button>
      </div>
      <h1>Anecdote with most votes</h1>
      <Anecdote anecdotes={anecdotes} votes={votes} selected={mostVotes}/>
    </div>
  )
}

export default App