import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeNotification } from '../reducers/notificationReducer'

const Notification = () => {
  const dispatch = useDispatch()
  const notification = useSelector(state => state.notification.content)
  const timeout = useSelector(state => state.notification.timeout)

  useEffect(() => {
    setTimeout(() => {
      dispatch(removeNotification())
    }, timeout * 1000)
  })

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10
  }

  return (
    <>
      {notification ?
        <div style={style}>
          {notification}
        </div>
        : null}
    </>
  )
}

export default Notification