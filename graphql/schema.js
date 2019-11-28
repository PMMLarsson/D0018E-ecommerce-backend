import { gql } from 'apollo-server-express'

export const schema = gql`
  type Query {
    admins: [Admin]
    assets: [Asset]
    assetByType(type: String!): Asset
    getCustomer(id: ID!): Customer
    orders(id: ID!): [Order]
    login(email: String!): LoginMessage
    comments(asset_type: String!): [Comment]
    grade(asset_type: String!): Float
    cart(customer_id: ID!): Cart
    cartSize(customer_id: ID!): Int
  }

  type Comment {
    id: ID!
    customer_id: ID!
    asset_type: String!
    date: String!
    contents: String
    upvotes: Int
    by_name: String
  }

  type Cart {
    customer_id: ID!
    contents: [Contents]
    date: String!
    nr_of_items: Int
  }

  type Contents {
    asset_type: String
    amount: Int
  }

  type Mutation {
    increaseAsset(type: String!, amount: Int!): SuccessMessage
    decreaseAsset(type: String!, amount: Int!): SuccessMessage
    createAsset(type: String!, amount: Int!, cost: Int!, currency:String!, description:String): SuccessMessage
    createCustomer(fname: String!, lname: String!, email:String!): LoginMessage
    createOrder(customer_id: ID!, metadata: [OrderMetaInput]!, total_cost: Int!, currency: String!): SuccessMessage
    addComment(asset_type: String!, customer_id: ID!, contents: String, by_name: String): SuccessMessage
    editComment(id: ID!, contents: String): SuccessMessage
    deleteComment(id: ID!): SuccessMessage
    updateGrade(asset_type: String!, customer_id: ID!, grade: Int): SuccessMessage
    updateCart(customer_id: ID!, contents: [ContentInput], total_amount: Int!): SuccessMessage
    clearCart(customer_id: ID!): SuccessMessage
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

  input ContentInput {
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
  
  type LoginMessage {
    id: ID!
    message: String
  }
`;