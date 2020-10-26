import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateBlog } from '../reducers/blogReducer'
import { v4 as uuidv4 } from 'uuid'
import { makeStyles } from '@material-ui/core/styles'
import { TextField, Button } from '@material-ui/core'

const useStyles = makeStyles({
  commentButton: {
    marginTop: 15,
    padding: 5,
    paddingLeft: 15,
    paddingRight: 25
  },
  table: {
    padding: 0,
    margin: 0,
    marginTop: 20,
    maxWidth: 450,
  },
})

const Comments = ({ blog, notifyWith }) => {
  const dispatch = useDispatch()

  const [comment, setComment] = useState('')

  const handleComment = async (event) => {
    event.preventDefault()
    if (!comment) {
      notifyWith('Input data is missing. Please check.', 'error')
    } else {
      const commentedBlog = {
        ...blog,
        comments: [...blog.comments, comment],
        user: blog.user.id
      }
      dispatch(updateBlog(commentedBlog))
      notifyWith(`Added comment '${comment}' for '${blog.title}'`)
      setComment('')
    }
  }

  const classes = useStyles()

  return (
    <div>
      <h3>Comments</h3>
      <form onSubmit={handleComment}>
        <div>
          <TextField
            value={comment}
            label='comment'
            onChange={({ target }) => setComment(target.value)}
          />
        </div>
        <div>
          <Button
            className={classes.commentButton}
            variant='contained'
            color='primary'
            type='submit'>
            add comment
          </Button>
        </div>
      </form>
      <div>
        <ul>
          {blog.comments.map(comment =>
            <li key={uuidv4()}><p>{comment}</p></li>
          )}
        </ul>
      </div>
    </div>
  )
}

export default Comments