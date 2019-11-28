import { ApolloError } from 'apollo-server-express'
import { QueryTypes } from 'sequelize'

export const cartConnector = async ({ db }, customer_id) => {
  try {
    const query = `
      SELECT
        *
      FROM shopping_cart
      WHERE customer_id = $customer_id
    `
    const res = await db.query(query, {
      bind: {
        customer_id
      },
      type: QueryTypes.SELECT,
    })
    if (!res) {
      throw new ApolloError('res undefined when querying cartConnector')
    }

    return res[0]
  } catch(error) {
    throw new ApolloError(`Error in cartConnector: ${error}`)
  }
}

export const cartSizeConnector = async ({ db }, customer_id) => {
  try {
    const query = `
      SELECT size_of_cart($customer_id)
    `
    const res = await db.query(query, {
      bind: {
        customer_id
      },
      type: QueryTypes.SELECT,
    })
    if (!res) {
      throw new ApolloError('res undefined when querying cartSizeConnector')
    }
    return res[0].size_of_cart
  } catch(error) {
    throw new ApolloError(`Error in cartSizeConnector: ${error}`)
  }
}

export const updateCartConnector = async ({ db }, customer_id, contents, total_amount) => {
  try {
    const query = `
      SELECT update_cart($customer_id , $contents, $amount)
    `
    await db.query(query, {
      bind: {
        customer_id,
        contents:JSON.stringify(contents),
        amount: total_amount
      },
      type: QueryTypes.INSERT,
    })

    return {
      success: true,
      message: `Shopping cart updated for customer with id ${customer_id}.`
    }
  } catch(error) {
    throw new ApolloError(`Error in updateCartConnector: ${error}`)
  }
}

export const clearCartConnector = async ({ db }, customer_id) => {
  try {
    const query = `
      UPDATE Shopping_cart
      SET
        contents = $contents,
        nr_of_items = 0
      WHERE customer_id = $customer_id
    `
    await db.query(query, {
      bind: {
        customer_id,
        contents: JSON.stringify([{}])
      },
      type: QueryTypes.UPDATE,
    })

    return {
      success: true,
      message: `Shopping cart cleared for customer with id ${customer_id}.`
    }
  } catch(error) {
    throw new ApolloError(`Error in clearCartConnector: ${error}`)
  }
}


