import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { makeStyles } from '@material-ui/core/styles'
import { TextField, Button } from '@material-ui/core'

const useStyles = makeStyles({
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
    dispatch(createBlog({ title, author, url }))
    notifyWith(`New blog '${title}' by ${author} added!`)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const classes = useStyles()

  return (
    <div>
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