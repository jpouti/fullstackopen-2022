require('dotenv').config()

const { ApolloServer, gql, UserInputError, AuthenticationError } = require('apollo-server')
const jwt = require('jsonwebtoken')

const JWT_SECRET = process.env.JWT_SECRET

const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')

const MONGODB_URL = process.env.MONGO_URL
console.log('connecting to MongoDB')

mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB', error.message)
  })

const typeDefs = gql`
  type User {
    username: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Book {
    title: String!
    author: Author!
    published: Int!
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!
    bookCount: Int!
    born: Int
    id: ID!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre:String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(name:String!, setBornTo: Int!): Author
    createUser(username: String!, password: String!): User
    login(username: String!, password: String!): Token
  }
`

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (args.author && args.genre) {
        const authorFilter = await Book.findOne({ name: args.author })
        if (authorFilter) {
          const books = await Book.find({ author: authorFilter._id, genres: { $in: [args.genre] } })
          return books
        } else {
          return null
        }
      }
      if(args.author) {
        const authorFilter = await Book.findOne({ name: args.author })
        const books = await Book.find({ author: authorFilter._id})
        return books
      }
      if (args.genre) {
        const books = await Book.find( { genres: { $in: [args.genre] } } )
        return books
      }
      const books = await Book.find({})

      return books
    },
    allAuthors: async () => await Author.find({}),
    me: (root, args, context) => {
      return context.currentUser
    },
  },
  Book: {
    author: async (root) => {
      const id = root.author
      const author = await Author.findOne({ _id: id })

      if(!author) {
        return
      }

      const booksCount = await Book.find( { author: author } ).countDocuments()

      return {
        name: author.name,
        born: author.born,
        bookCount: booksCount
      }
    }
  },
  Author: {
    bookCount: async (root) => {
      const author = await Author.findOne({ name: root.name })

      if(!author) {
        return
      }

      const booksCount = await Book.find( { author: author } ).countDocuments()
      return booksCount
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser

      if(!currentUser) {
        throw new AuthenticationError('not authenticated')
      }

      const author = await Author.findOne({ name: args.author })
      let book
      try {
        if (!author) {
          const newAuthor = new Author({
            name: args.author,
            born: null
          })
          await newAuthor.save()
          book = new Book({ ...args, author: newAuthor })
          await book.save()
        } else {
          book = new Book({ ...args, author: author._id})
          await book.save()
        }
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      return book

    },
    editAuthor: async (root, args, context) => {

      const currentUser = context.currentUser

      if(!currentUser) {
        throw new AuthenticationError('not authenticated')
      }
      const author = await Author.findOne({ name: args.name })
      if(!author) {
        return null
      }
      try {
        author.born = args.setBornTo
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return author
    },
    createUser: async (root, args) => {
      const user = new User({ username: args.username })

      return user.save().catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      if(!user || args.password !== 'secret') {
        throw new UserInputError('wrong credentials')
      }

      const userForToken = {
        username: user.name,
        id: user._id
      }

      return { value: jwt.sign(userForToken, JWT_SECRET)}
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})