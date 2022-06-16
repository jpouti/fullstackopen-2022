const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')
const helper = require('./test_helper')
const bcrypt = require('bcrypt')

beforeEach(async () => {
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('root', 10)
  const user = new User({ username: 'root', passwordHash })

  await user.save()
})

describe('bloglist expansion continues, exercises 4.16 -', () => {
  test('Invalid users are not created and related error message is displayed, STEP 4', async () => {
    const usersAtStart = await helper.usersInDb()
    expect(usersAtStart).toHaveLength(1)

    const invalidUser1 = { // username missing
      name: 'tester',
      password: 'tester'
    }
    const invalidUser2 = { // username too short
      username: 't',
      name: 'tester',
      password: 'tester'
    }
    const invalidUser3 = { // password too short
      username: 'tester',
      name: 'tester',
      password: 't'
    }

    await api
      .post('/api/users')
      .send(invalidUser1)
      .expect(400)
    await api
      .post('/api/users')
      .send(invalidUser2)
      .expect(400)
    await api
      .post('/api/users')
      .send(invalidUser3)
      .expect(400)
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart) // same as before invalid posts
  })
})

afterAll(() => {
  mongoose.connection.close()
})

