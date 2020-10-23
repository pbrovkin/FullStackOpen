import React, { useState, useImperativeHandle } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'

const useStyles = makeStyles({
  button: {
    marginTop: 10
  },
})

const Togglable = React.forwardRef((props, ref) => {

  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  const classes = useStyles()

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button
          onClick={toggleVisibility}
          className={classes.button}
          variant='contained'
          color='primary'>
          {props.buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible} className='togglableContent'>
        {props.children}
        <Button
          onClick={toggleVisibility}
          className={classes.button}
          variant='contained'
          color='primary'>
          cancel
        </Button>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'

export default Togglable