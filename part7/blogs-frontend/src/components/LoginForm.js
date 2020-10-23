import React from 'react'
import Notification from './Notification'
import { makeStyles } from '@material-ui/core/styles'
import { TextField, Button } from '@material-ui/core'

const useStyles = makeStyles({
  button: {
    marginTop: 10
  },
})

const LoginForm = ({ setUsername, setPassword, handleLogin, notification }) => {
  const classes = useStyles()

  return (
    <div>
      <h2>Login BlogsApp</h2>

      <Notification notification={notification} />

      <form onSubmit={handleLogin}>
        <div>
          <TextField label='username' onChange={({ target }) => setUsername(target.value)} />
        </div>
        <div>
          <TextField label='password' type='password' onChange={({ target }) => setPassword(target.value)} />
        </div>
        <div>
          <Button className={classes.button} variant='contained' color='primary' type='submit'>
            login
          </Button>
        </div>
      </form>
    </div>
  )
}

export default LoginForm