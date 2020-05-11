import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0))

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  }

  const handleNextAnecdote = () => {
    setSelected(getRandomInt(0, props.anecdotes.length))
  }

  const handleVoteAnecdote = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
    console.log(points);
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <div>
        {props.anecdotes[selected]}
      </div>
      <div>
        has {points[selected]} votes
      </div>
      <div>
        <Button onClick={handleVoteAnecdote} text='vote' />
        <Button onClick={handleNextAnecdote} text='next anecdote' />
      </div>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)