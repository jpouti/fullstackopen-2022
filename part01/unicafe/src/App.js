import { useState } from 'react';
import './app.css';

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  function reviews() {
    if (good + neutral + bad > 0) {
      return true;
    }
    return false;
  }

  return (
    <div>
      <h1>Give Feedback</h1>
      <div className='btns'>
        <button onClick={() => setGood(good + 1)}>Good</button>
        <button onClick={() => setNeutral(neutral + 1)}>Neutral</button>
        <button onClick={() => setBad(bad + 1)}>Bad</button>
      </div>
      <h1>Statistics</h1>
      <div>
        {reviews() === false ? <NoStatisctics />
        : <Statistics good={good} neutral={neutral} bad={bad} />}
      </div>
    </div>
  )
}

export default App;

const NoStatisctics = () => {
  return (
    <div>
      <p>No feedback given</p>
    </div>
  )
}

const Statistics = (props) => {
  const totalReviews = props.good + props.neutral + props.bad;
  const score = props.good - props.bad; // score - good +1, neutral 0, bad -1
  const avg = score / totalReviews;
  const pos = (props.good / totalReviews) * 100; // positive as %
  return(
    <table>
      <tbody>
      <StatisticLine text="good" value ={props.good} />
      <StatisticLine text="neutral" value ={props.neutral} />
      <StatisticLine text="bad" value ={props.bad} />
      <StatisticLine text="all" value ={totalReviews} />
      <StatisticLine text="average" value ={avg} />
      <StatisticLine text="positive" value ={pos.toString() + " %"} />
      </tbody>
    </table>
  )
}

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}