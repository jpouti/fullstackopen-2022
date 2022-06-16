const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')

const User = require('../models/user')

let token

describe('Blog list tests', () => {
  // initialize blogs before 'first blog list' tests -> get & post tests
  beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})
    token = await helper.getToken('root', 'root')

    for (let blog of helper.initialBlogs) {
      let blogObject = new Blog(blog)
      await blogObject.save()
    }
  })
  let newBlogObject = {
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
  }
  test('notes are returned as json (4.8 -> 4.12)', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('there are as many blogs as there is in blogs test db, STEP 1', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('blogs have unique identifier property named id, STEP 2', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  })

  test('HTTP POST succesfully creates a new blog post => saved to the db & likes property to default 0 if property is missing, STEP 3 & STEP 4', async () => {
    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlogObject)
      .expect(201)

    const blogsAtEnd = await helper.blogsIndb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    expect(blogsAtEnd[blogsAtEnd.length -1].likes).toBe(0) // STEP4 likes to be 0 by default
  })
  test('blog with missing both title and url properties is responding with status code 400 Bad Request, STEP 5', async () => {
    const blogObjectWithoutTitleAndUrl = {
      author: 'Robert C. Martin',
      __v: 0
    }
    const blogObjectWithoutTitle = {
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
      __v: 0
    }
    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(blogObjectWithoutTitleAndUrl)
      .expect(400)

    const blogsAfterFirst = await helper.blogsIndb()
    expect(blogsAfterFirst).toHaveLength(helper.initialBlogs.length) // no blogs created

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(blogObjectWithoutTitle)
      .expect(201) // works with url || title

    const blogsAfterSecond = await helper.blogsIndb()
    expect(blogsAfterSecond).toHaveLength(helper.initialBlogs.length + 1) // +1 from blog without title
  })
  test('Posting a new blog without provided token is failing with status code 401', async() => {
    const blogsAtStart = await helper.blogsIndb()
    await api
      .post('/api/blogs')
      .send(newBlogObject)
      .expect(401)
    const blogsAfter = await helper.blogsIndb()
    expect(blogsAtStart).toHaveLength(blogsAfter.length)
  })

})

describe('Blog list expansions (4.13 - 4.14)', () => {
  // initialize blogs with authorization for testing DELETE
  beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})
    token = await helper.getToken('root', 'root')

    for (let blog of helper.initialBlogs) {
      await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${token}`)
        .send(blog)
    }
  })
  test('Deleting single blog post is succesfull, STEP 1', async() => {

    const blogsAtStart = await helper.blogsIndb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `bearer ${token}`)
      .expect(204)
    const blogsAtEnd = await helper.blogsIndb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

    const blogContents = blogsAtEnd.map(blog => blog.title)
    expect(blogContents).not.toContain(blogToDelete.title)
  })
  test('Updating the information of a blog post succefully, STEP 2', async() => {
    const blogsAtStart = await helper.blogsIndb()
    const blogToUpdate = blogsAtStart[0]
    const blogUpdate = {
      ...blogToUpdate,
      likes: blogToUpdate.likes + 1
    }
    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .set('Authorization', `bearer ${token}`)
      .send(blogUpdate)
      .expect(200)

    const blogsAtEnd = await helper.blogsIndb()
    expect(blogsAtEnd[0].likes).toBe(blogToUpdate.likes + 1)
  })
})

afterAll(() => {
  mongoose.connection.close()
})