const loggedUserReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.data
    case 'UNSET_USER':
      return null
    default:
      return state
  }
}

export const setUser = (user) => {
  return {
    type: 'SET_USER',
    data: user
  }
}

export const unsetUser = () => {
  return {
    type: 'UNSET_USER'
  }
}

export default loggedUserReducer