import React from 'react'

const Notification = ({ message }) => {

  const notifStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px',
  }

  if (message === null) {
    return null
  }

  if (message.includes('error')) {
    notifStyle.color = 'red'
  }

  return (
    <p style={notifStyle}>
      {message}
    </p>
  )
}

export default Notification