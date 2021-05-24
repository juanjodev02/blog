import { gql } from '@apollo/client'

export const typeDefs = gql`
  type Auth {
    email: String
    password: String
  }

  type Post {
    id: ID
    title: String
    date: String
    coverImage: String
    excerpt: String
    ogImage: String
    published: Boolean
  }

  type Author {
    id: ID
    name: String
    lastName: String
    twitter: String
    github: String
    posts: [Post]
    user: User
  }

  type User {
    id: ID
    username: String
    author: Author
  }

  input SignUpInput {
    email: String!
    username: String!
    password: String!
  }

  input SignInInput {
    email: String!
    password: String!
  }

  type SignUpPayload {
    user: User
  }

  type SignInPayload {
    user: User
  }

  type Query {
    viewer: User
  }

  type Mutation {
    signUp(input: SignUpInput!): SignUpPayload!
    signIn(input: SignInInput!): SignInPayload!
    signOut: Boolean!
    createAuthor(username: String!, name: String!, lastName: String!, twitter: String, github: String): Author
  }
`
