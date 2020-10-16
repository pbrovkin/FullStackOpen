import commentService from '../services/comments'

const commentReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_COMMENTS':
      return action.data
    case 'NEW_COMMENT':
      return [...state, action.data]
    default:
      return state
  }
}

export const initializeComments = () => {
  return async dispatch => {
    const comments = await commentService.getAll()
    dispatch({
      type: 'INIT_COMMENTS',
      data: comments,
    })
  }
}

export const createComment = (object) => {
  return async dispatch => {
    const newComment = await commentService.create(object)
    dispatch({
      type: 'NEW_COMMENT',
      data: newComment,
    })
  }
}

export default commentReducer