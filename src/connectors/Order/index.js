import { ApolloError } from 'apollo-server-express'
import { QueryTypes } from 'sequelize'

export const getOrdersConnector = async ({db}, id) => {
  try {
    if(!id) {
      throw new ApolloError("Query variables for getOrdersConnector invalid!")
    }

    const query = `
      SELECT
        *
      FROM Orders
      WHERE id = $id
    `
    const res = await db.query(query, {
      bind: {
        id
      },
      type: QueryTypes.SELECT,
    })
    if (!res) {
      throw new ApolloError('res undefined when querying getOrdersConnector')
    }

    return res
  } catch(error) {
    throw new ApolloError(`Error in getOrdersConnector: ${error}`)
  }
}

export const createOrderConnector = async ({ db }, buyer, metadata, total_cost, currency) => {
  try {
    if(!buyer|| !metadata || !total_cost || !currency) {
      throw new ApolloError("Mutation variables for createOrderConnector invalid!")
    }

    if(total_cost < 0 || currency === "") {
      throw new ApolloError("Mutation variables for createOrderConnector invalid!")
    }

    const query = `
      INSERT INTO Orders (buyer, metadata, date, total_cost, currency) 
      VALUES ($buyer, $metadata, NOW() AT TIME ZONE 'UTC', $total_cost, $currency)
    `
    await db.query(query, {
      bind: {
        buyer,
        metadata:JSON.stringify(metadata),
        total_cost:total_cost*100,
        currency
      },
      type: QueryTypes.INSERT,
    })
    
    return {
      success: true,
      message: `New order was placed!`
    }
  } catch(error) {
    throw new ApolloError(`Error in createOrderConnector: ${error}`)
  }
}