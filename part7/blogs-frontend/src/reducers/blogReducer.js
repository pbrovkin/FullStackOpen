import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_BLOGS':
      return action.data
    case 'NEW_BLOG':
      return [...state, action.data]
    case 'LIKE_BLOG':
      return state.map(blog =>
        blog.id !== action.data.id ? blog : action.data)
    case 'REMOVE_BLOG':
      return state.filter(blog => blog.id !== action.id)
    default:
      return state
  }
}

export const initBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    })
  }
}

export const createBlog = (object) => {
  return async dispatch => {
    const newBlog = await blogService.create(object)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog,
    })
  }
}

export const likeBlog = (object) => {
  return async dispatch => {
    const likedBlog = await blogService.update(object)
    dispatch({
      type: 'LIKE_BLOG',
      data: likedBlog
    })
  }
}

export const removeBlog = (id) => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch({
      type: 'REMOVE_BLOG',
      id
    })
  }
}

export default blogReducer