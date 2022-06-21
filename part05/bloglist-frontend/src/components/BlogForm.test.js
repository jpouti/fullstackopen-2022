import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('Blog form calls event handler with correct details when submitting the form, 5.16 STEP 4', async () => {
  const createBlog = jest.fn()
  const user = userEvent.setup()

  render(
    <BlogForm createBlog={createBlog} />
  )
  const title = screen.getByPlaceholderText('Title')
  const author = screen.getByPlaceholderText('Author')
  const url = screen.getByPlaceholderText('Url')
  const createBtn = screen.getByText('create')

  await user.type(title, 'title')
  await user.type(author, 'author')
  await user.type(url, 'url/url.test')
  await user.click(createBtn)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('title')
  expect(createBlog.mock.calls[0][0].author).toBe('author')
  expect(createBlog.mock.calls[0][0].url).toBe('url/url.test')

})