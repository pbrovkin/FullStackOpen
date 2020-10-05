const initialState = {
  content: '',
  time: 0
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

export const setNotification = (content, timeout) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: {
        content
      }
    })
    clearTimeout(timeoutID)
    timeoutID = setTimeout(() => {
      dispatch(removeNotification())
    }, timeout * 1000)
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