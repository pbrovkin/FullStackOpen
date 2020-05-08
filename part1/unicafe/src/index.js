import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const Feedback = ({ type, text }) => (
  <p>{text}: {type}</p>
)

const Average = ({ good, bad, all }) => {
  if (all === 0) {
    return <p>average: 0</p>
  }
  return (
    <p>average: {(good - bad) / all}</p>
  )
}

const Positive = ({ good, all }) => {
  if (all === 0) {
    return <p>positive: 0</p>
  }
  return <p>positive: {((100 * good) / all) + ' %'}</p>
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
    setAll(all + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
    setAll(all + 1)
  }
  const handleBadClick = () => {
    setBad(bad + 1)
    setAll(all + 1)
  }

  return (
    <div>
      <h1>Give feedback</h1>
      <Button onClick={handleGoodClick} text='good' />
      <Button onClick={handleNeutralClick} text='netral' />
      <Button onClick={handleBadClick} text='bad' />
      <h1>Statistics</h1>
      <Feedback type={good} text='good' />
      <Feedback type={neutral} text='neutral' />
      <Feedback type={bad} text='bad' />
      <Feedback type={all} text='all' />
      <Average good={good} bad={bad} all={all} />
      <Positive good={good} all={all} />
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)