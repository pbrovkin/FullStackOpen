import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const StatisticLine = ({ text, value }) => (
  <p>{text}: {value}</p>
)

const Average = ({ good, bad, all }) => {
  return (good - bad) / all
}

const Positive = ({ good, all }) => {
  return (100 * good) / all + ' %'
}

const Statistics = ({ good, neutral, bad, all }) => {
  if (all === 0) {
    return (
      <p>No feedback was given</p>
    )
  }
  return (
    <>
      <StatisticLine text='good: ' value={good} />
      <StatisticLine text='neutral: ' value={neutral} />
      <StatisticLine text='bad: ' value={bad} />
      <StatisticLine text='all: ' value={all} />
      <StatisticLine text='average: ' value={<Average good={good} bad={bad} all={all} />} />
      <StatisticLine text='positive: ' value={<Positive good={good} all={all} />} />
    </>
  )
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
      <Statistics good={good} neutral={neutral} bad={bad} all={all} />
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)