import React from 'react'
import Notification from './Notification'

const LoginForm = ({
  username,
  setUsername,
  password,
  setPassword,
  handleLogin,
  notification
}) => {
  
  return (
    <div>
      <h2>login to application</h2>

      <Notification notification={notification} />

      <form onSubmit={handleLogin}>
        <div>
          username
            <input
            id='username'
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
            <input
            id='password'
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id='login'>login</button>
      </form>
    </div>
  )
}

export default LoginForm