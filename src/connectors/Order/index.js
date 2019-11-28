import { ApolloError } from 'apollo-server-express'
import { QueryTypes } from 'sequelize'

import { clearCartConnector  } from "../Cart"

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

export const createOrderConnector = async (context, customer_id, metadata, total_cost, currency) => {
  try {
    if(!customer_id || !metadata || !total_cost || !currency) {
      throw new ApolloError("Mutation variables for createOrderConnector invalid!")
    }

    if(total_cost < 0 || currency === "") {
      throw new ApolloError("Mutation variables for createOrderConnector invalid!")
    }

    const query = `
      SELECT create_order($customer_id, $metadata, $total_cost, $currency);
    `
    await context.db.query(query, {
      bind: {
        customer_id,
        metadata:JSON.stringify(metadata),
        total_cost:total_cost*100,
        currency
      },
      type: QueryTypes.INSERT,
    })

    // After order was placed clear current cart
    await clearCartConnector(context, customer_id)
    
    return {
      success: true,
      message: `New order was placed!`
    }
  } catch(error) {
    throw new ApolloError(`Error in createOrderConnector: ${error}`)
  }
}