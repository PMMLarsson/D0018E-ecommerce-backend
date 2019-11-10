import { gql } from 'apollo-server-express'

export const schema = gql`
  type Query {
    admins: [Admin]
    assets: [Asset]
    getCustomer(id:ID!): [Customer]
    orders(id:ID!): [Order]
  }

  type Mutation {
    increaseAsset(type:String!, amount:Int!): SuccessMessage
    decreaseAsset(type:String!, amount:Int!): SuccessMessage
    createAsset(type:String!, amount:Int!, cost:Int!, currency:String!, description:String): SuccessMessage
    createCustomer(fname:String!, lname:String!, email:String!): SuccessMessage
    createOrder(buyer:ID!, metadata:[OrderMetaInput]!, total_cost:Int!, currency:String!): SuccessMessage
  }

  type Admin {
    id: ID!
    name: String
  }

  type Asset {
    type: String!
    amount: Int
    cost: Int
    currency: String
    description: String
  }

  type Customer {
    id: ID!
    fname: String
    lname: String
    email: String
  }

  type Order {
    id: ID!
    buyer: ID!
    metadata: OrderMetaOutput
    date: String
    total_cost: Int
    currency: String
  }

  input OrderMetaInput {
    asset_type: String
    amount: Int
  }

  type OrderMetaOutput {
    asset_type: String
    amount: Int
  }

  type SuccessMessage {
    success: Boolean
    message: String
  }
`;