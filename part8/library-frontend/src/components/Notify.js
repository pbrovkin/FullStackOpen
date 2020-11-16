import React from 'react'

const Notify = ({ errorMessage }) => {
  if (!errorMessage) {
    return null
  }

  return (
    <div style={{ color: 'red', marginTop: 10 }}>
      {errorMessage}
    </div>
  )
}

export default Notify