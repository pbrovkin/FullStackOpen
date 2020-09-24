import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

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

  beforeEach(() => {
    component = render(
      <Blog blog={blog} user={user}/>
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
})



