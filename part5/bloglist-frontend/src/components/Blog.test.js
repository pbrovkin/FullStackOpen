import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'
import BlogForm from './BlogForm'

describe('<Blog />', () => {
  let component

  const blog = {
    title: 'Component testing',
    author: 'Blog Author',
    url: 'http://localhost:3000/',
    likes: 0,
    user: {
      username: 'pavel',
      name: 'Pavel Durov'
    }
  }

  const user = {
    username: 'pavel',
    name: 'Pavel Durov'
  }

  const addLike = jest.fn()

  beforeEach(() => {
    component = render(
      <Blog blog={blog} user={user} addLike={addLike} />
    )
  })

  test('renders title and author, not orl or likes', () => {
    const blogDiv = component.container.querySelector('.blog')
    expect(blogDiv).toHaveTextContent('Component testing')
    expect(blogDiv).toHaveTextContent('Blog Author')
    expect(blogDiv).not.toHaveTextContent('http://localhost:3000/')
    expect(blogDiv).not.toHaveTextContent('0 likes')
  })

  test('renders title, author, url and likes when the view button clicked', () => {
    const button = component.container.querySelector('button')
    fireEvent.click(button)
    const blogDiv = component.container.querySelector('.blog')
    expect(blogDiv).toHaveTextContent('Component testing')
    expect(blogDiv).toHaveTextContent('Blog Author')
    expect(blogDiv).toHaveTextContent('http://localhost:3000/')
    expect(blogDiv).toHaveTextContent('0 likes')
  })

  test('if the like button is clicked twice the event handler is called twice', () => {
    const viewButton = component.container.querySelector('button')
    fireEvent.click(viewButton)
    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)
    expect(addLike.mock.calls).toHaveLength(2)
  })
})

describe('<BlogForm />', () => {

  test('the form calls the event handler it received as props with the right details', () => {
    const createBlog = jest.fn()

    const component = render(
      <BlogForm createBlog={createBlog} />
    )

    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')
    const form = component.container.querySelector('form')

    fireEvent.change(title, { target: { value: 'Testing blog form' } })
    fireEvent.change(author, { target: { value: 'Testing Author' } })
    fireEvent.change(url, { target: { value: 'http://url.com/' } })
    fireEvent.submit(form)

    expect(createBlog.mock.calls[0][0].title).toBe('Testing blog form')
    expect(createBlog.mock.calls[0][0].author).toBe('Testing Author')
    expect(createBlog.mock.calls[0][0].url).toBe('http://url.com/')
  })
})



