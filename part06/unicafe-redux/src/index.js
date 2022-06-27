import React from 'react';
import ReactDOM from 'react-dom/client'
import { legacy_createStore as createStore} from 'redux'
import counterReducer from './reducer'

const store = createStore(counterReducer)

const App = () => {
  const handleReviewClick = (type) => {
    store.dispatch({
      type
    })
  }

  return (
    <div>
      <button onClick={() => handleReviewClick('GOOD')}>good</button>
      <button onClick={() => handleReviewClick('OK')}>ok</button>
      <button onClick={() => handleReviewClick('BAD')}>bad</button>
      <button onClick={() => handleReviewClick('ZERO')}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>ok {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)
