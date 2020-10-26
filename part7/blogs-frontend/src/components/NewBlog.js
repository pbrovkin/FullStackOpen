import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { makeStyles } from '@material-ui/core/styles'
import { TextField, Button } from '@material-ui/core'

const useStyles = makeStyles({
  formDiv: {
    marginTop: 10
  },
  button: {
    marginTop: 10
  },
})

const NewBlog = ({ notifyWith }) => {
  const dispatch = useDispatch()

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleNewBlog = async (event) => {
    event.preventDefault()
    if (title && author && url) {
      dispatch(createBlog({ title, author, url }))
      notifyWith(`New blog '${title}' by ${author} added!`)
      setTitle('')
      setAuthor('')
      setUrl('')
    } else {
      notifyWith('Input data is missing. Please check.', 'error')
    }
  }

  const classes = useStyles()

  return (
    <div className={classes.formDiv}>
      <form onSubmit={handleNewBlog}>
        <div>
          <TextField value={title} label='title' onChange={({ target }) => setTitle(target.value)} />
        </div>
        <div>
          <TextField value={author} label='author' onChange={({ target }) => setAuthor(target.value)} />
        </div>
        <div>
          <TextField value={url} label='url' onChange={({ target }) => setUrl(target.value)} />
        </div>
        <div>
          <Button className={classes.button} variant='contained' color='primary' type='submit'>
            add blog
          </Button>
        </div>
      </form>
    </div>
  )
}

export default NewBlog