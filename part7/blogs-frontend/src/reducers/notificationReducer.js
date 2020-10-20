const initialState = {
  message: '',
  type: ''
}

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data
    case 'REMOVE_NOTIFICATION':
      return initialState
    default:
      return state
  }
}

let timeoutID

export const setNotification = (message, type) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: {
        message,
        type
      }
    })
    clearTimeout(timeoutID)
    timeoutID = setTimeout(() => {
      dispatch(removeNotification())
    }, 5000)
  }
}

export const removeNotification = () => {
  return async dispatch => {
    dispatch({
      type: 'REMOVE_NOTIFICATION'
    })
  }
}

export default notificationReducer