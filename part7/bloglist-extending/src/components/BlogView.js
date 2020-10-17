import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createComment } from '../reducers/commentReducer'

const BlogView = ({ blog, handleLike, handleRemove, user, comments, notifyWith }) => {
  const dispatch = useDispatch()

  const [content, setContent] = useState('')

  if (!blog) {
    return null
  }

  const handleNewComment = async (event) => {
    event.preventDefault()
    setContent('')
    dispatch(createComment({ content: content, blogId: blog.id }))
    notifyWith(`You added a comment '${content}'`)
  }

  const currentComments = comments.filter(comment => comment.blog.id === blog.id)

  return (
    <div>
      <div>
        <h3>{blog.title}</h3>
      </div>
      <div>
        <a href={blog.url} target='_blank' rel='noopener noreferrer'>
          {blog.url}
        </a>
      </div>
      <div>likes {blog.likes}
        <button onClick={() => handleLike(blog.id)}>like</button>
      </div>
      <div>added by {blog.user.name}</div>
      {user.username === blog.user.username &&
        <button onClick={() => handleRemove(blog.id)}>remove</button>}
      <div>
        <h3>comments:</h3>
        <form onSubmit={handleNewComment}>
          <input
            id='content'
            value={content}
            onChange={({ target }) => setContent(target.value)}
          />
          <button>create</button>
        </form>
        <ul>
          {currentComments.map(comment => <li key={comment.id}>{comment.content}</li>)}
        </ul>
      </div>
    </div>
  )
}

export default BlogView