import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const StatisticLine = ({ text, value }) => (
  <tr><td>{text}</td><td>{value}</td></tr>
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
      <tr><td>No feedback was given</td></tr>
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
      <table>
        <tbody>
          <Statistics good={good} neutral={neutral} bad={bad} all={all} />
        </tbody>
      </table>
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)