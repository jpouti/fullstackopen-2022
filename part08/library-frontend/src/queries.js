import { gql } from "@apollo/client";

export const ALL_AUTHORS = gql`
query {
  allAuthors {
    name
    born
    bookCount
  }
}
`

export const ALL_BOOKS = gql`
query {
  allBooks {
    title
    author {
      name
      bookCount
    }
    published
    genres
  }
}
`

export const BOOKS_BY_GENRE = gql`
query findBooksByGenre($genreToFilter: String!) {
  allBooks(genre: $genreToFilter) {
    title
    published
    author {
      name
      bookCount
    }
  }
}
`

export const CREATE_BOOK = gql`
mutation createBook($title: String!, $author: String!, $published: Int!, $genres:[String!]!) {
  addBook(
    title: $title,
    author: $author,
    published: $published,
    genres: $genres
  ) {
    title
    author {
      name
      bookCount
    }
    published
    genres
  }
}
`

export const SET_YEAR = gql`
mutation setYear($name: String!, $setBornTo: Int!) {
  editAuthor(name: $name, setBornTo: $setBornTo) {
    name
    born
  }
}
`

export const LOGIN = gql`
mutation login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    value
  }
}
`

export const SET_FAVORITE = gql`
mutation setFavorite($setFavorite: String!) {
  setFavorite(setFavorite: $setFavorite) {
    username
    favorite
  }
}
`

export const USER = gql`
query {
  me {
    favorite
  }
}
`