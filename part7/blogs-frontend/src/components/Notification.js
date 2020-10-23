import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Alert } from '@material-ui/lab'

const useStyles = makeStyles({
  alert: {
    padding: 0,
    marginTop: 20,
    marginBottom: 10
  },
})

const Notification = ({ notification }) => {
  const classes = useStyles()
  const severity = notification.type === 'success' ? 'success' : 'error'

  if (!notification.message) {
    return null
  }

  return (
    <Alert className={classes.alert} severity={severity}>
      {notification.message}
    </Alert>
  )
}

export default Notification