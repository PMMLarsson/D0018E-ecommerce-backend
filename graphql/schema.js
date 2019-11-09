import { gql } from 'apollo-server-express'

export const schema = gql`
  type Query {
    admins: [Admin]
  }
  type Admin {
    id: ID!
    name: String
  }
`;