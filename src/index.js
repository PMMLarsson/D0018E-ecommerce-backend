import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import { ApolloServer } from 'apollo-server-express';
import { schema } from '../graphql/schema.js'
import { resolvers } from './resolvers'
import db from './db'



const app = express();
app.use(cors());

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context:{
    db
  }
})

server.applyMiddleware({ app, path: '/graphql' })

app.listen({ port: 14000 }, () => {
  console.log('Apollo Server on http://localhost:14000/graphql');
})
