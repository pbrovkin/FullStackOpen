import React from 'react'
import Comments from './Comments'
import { makeStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'

const useStyles = makeStyles({
  removeButton: {
    padding: 5
  },
  likeButton: {
    padding: 5,
    marginLeft: 10
  },
})

const BlogView = ({ blog, handleLike, handleRemove, user, notifyWith }) => {
  const classes = useStyles()

  if (!blog) {
    return null
  }

  return (
    <div>
      <h3>{blog.title}</h3>
      <p>
        <a href={blog.url} target='_blank' rel='noopener noreferrer'>
          {blog.url}
        </a>
      </p>
      <p>added by {blog.user.name}</p>
      <p>likes: {blog.likes}</p>
      <p>
        {user && user.username === blog.user.username &&
          <Button
            onClick={() => handleRemove(blog.id)}
            className={classes.removeButton}
            variant='contained'
            color='primary'>
            remove
          </Button>}
        <Button
          onClick={() => handleLike(blog.id)}
          className={user.username === blog.user.username ?
            classes.likeButton : null}
          variant='contained'
          color='primary'>
          like
        </Button>
      </p>
      <Comments blog={blog} notifyWith={notifyWith} />
    </div>
  )
}

export default BlogView