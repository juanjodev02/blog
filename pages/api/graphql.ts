import { ApolloServer } from 'apollo-server-micro'
import { schema } from '../../graphql/schema'

const apolloServer = new ApolloServer({
  schema,
  context (ctx) {
    return ctx
  },
  subscriptions: {
    path: '/api/graphql/subscriptions',
    onConnect: (connectionParams, webSocket, context) => {
      console.log('Client connected')
    },
    onDisconnect: (webSocket, context) => {
      console.log('Client disconnected')
    }
  }
})

export const config = {
  api: {
    bodyParser: false
  }
}

export default apolloServer.createHandler({ path: '/api/graphql' })
