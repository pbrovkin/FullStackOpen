import React from 'react'
import Comments from './Comments'
import { makeStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'

const useStyles = makeStyles({
  removeButton: {
    padding: 5
  }
})

const BlogView = ({ blog, handleLike, handleRemove, user, notifyWith }) => {
  const classes = useStyles()

  const own = user.username === blog.user.username

  if(own) {
    classes.likeButton = { padding: 5, marginLeft: 10 }
  }

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
        {own &&
          <Button
            onClick={() => handleRemove(blog.id)}
            className={classes.removeButton}
            variant='contained'
            color='primary'>
            remove
          </Button>}
        <Button
          onClick={() => handleLike(blog.id)}
          style={classes.likeButton}
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