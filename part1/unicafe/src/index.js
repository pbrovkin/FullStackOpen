import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const Statistic = ({ text, type }) => (
  <p>{text}: {type}</p>
)

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => setGood(good + 1)
  const handleNeutral = () => setNeutral(neutral + 1)
  const handleBad = () => setBad(bad + 1)

  return (
    <div>
      <h1>Give feedback</h1>
      <Button onClick={handleGood} text='good' />
      <Button onClick={handleNeutral} text='netral' />
      <Button onClick={handleBad} text='bad' />
      <h1>Statistics</h1>
      <Statistic type={good} text='good' />
      <Statistic type={neutral} text='neutral' />
      <Statistic type={bad} text='bad' />
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)