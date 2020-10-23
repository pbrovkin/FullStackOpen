import React from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { AppBar, Toolbar, Button } from '@material-ui/core'

const useStyles = makeStyles({
  left: {
    marginRight: 16,
    marginLeft: -24
  },
  right: {
    marginLeft: 'auto',
    marginRight: -20
  },
  center: {
    marginLeft: 'auto',
    marginRight: -20
  },
})

const Navigation = ({ user, handleLogout }) => {
  const classes = useStyles()

  return (
    <AppBar position='static'>
      <Toolbar>
        <div className={classes.left}>
          <Button color='inherit' component={Link} to='/'>
            blogs
          </Button>
          <Button color='inherit' component={Link} to='/users'>
            users
          </Button>
        </div>
        <div className={classes.center}>
          <h2>BlogsApp</h2>
        </div>
        <div className={classes.right}>
          <em>{user.name} logged in</em>
          <Button color='inherit' onClick={handleLogout}>
            logout
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default Navigation