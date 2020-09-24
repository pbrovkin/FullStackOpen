import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('renders title and author, not orl or likes', () => {
  const blog = {
    title: 'Component testing',
    author: 'Blog Author',
    url: 'http://localhost:3000/',
    likes: 0,
    user: {
      name: 'Pavel Durov'
    }
  }

  const component = render(
    <Blog blog={blog} />
  )

  const blogDiv = component.container.querySelector('.blog')
  expect(blogDiv).toHaveTextContent('Component testing')
  expect(blogDiv).toHaveTextContent('Blog Author')
  expect(blogDiv).not.toHaveTextContent('http://localhost:3000/')
  expect(blogDiv).not.toHaveTextContent('0 likes')
})