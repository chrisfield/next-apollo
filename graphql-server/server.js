require('dotenv').config()
const { ApolloServer, gql } = require('apollo-server')
const { MongoClient, ObjectId } = require('mongodb')
const books = [
  {
    title: 'Harry Potter and the Chamber of Secrets',
    author: 'J.K. Rowling'
  },
  {
    title: 'Jurassic Park',
    author: 'Michael Crichton'
  }
]

const typeDefs = gql`
  # Comments in GraphQL are defined with the hash (#) symbol.

  # This "Book" type can be used in other type declarations.
  type Book {
    title: String
    author: String
  }

  type Page {
    title: String
  }  

  # The "Query" type is the root of all GraphQL queries.
  # (A "Mutation" type will be covered later on.)
  type Query {
    books: [Book],
    pages: [Page]
  }
`

// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.

const start = async () => {
  const client = await MongoClient.connect(
    `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`
  )
  const db = client.db(process.env.MONGO_DB)

  const Pages = db.collection('Pages')

  // Resolvers define the technique for fetching the types in the
  // schema.  We'll retrieve books from the "books" array above.
  const resolvers = {
    Query: {
      books: () => books,
      pages: async () => Pages.find({}).toArray()
    }
  }

  const apServer = new ApolloServer({ typeDefs, resolvers });

  // This `listen` method launches a web-server.  Existing apps
  // can utilize middleware options, which we'll discuss later.
  apServer.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`)
  })
}

start()
