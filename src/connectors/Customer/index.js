import { ApolloError } from 'apollo-server-express'
import { QueryTypes } from 'sequelize'

export const getCustomerByIdConnector = async ({db}, id) => {
  try {
    if(!id) {
      throw new ApolloError("Query variables for getCustomerByIdConnector invalid!")
    }

    const query = `
      SELECT
        *
      FROM Customers
      WHERE id = $id
    `
    const res = await db.query(query, {
      bind: {
        id
      },
      type: QueryTypes.SELECT,
    })
    if (!res) {
      throw new ApolloError('res undefined when querying getCustomerConnector')
    }
    
    return res
  } catch(error) {
    throw new ApolloError(`Error in getCustomerConnector: ${error}`)
  }
}

export const createCustomerConnector = async ({ db }, fname, lname, email) => {
  try {
    if(!fname || fname === "" || !lname || lname === "" || !email || email === "") {
      throw new ApolloError("Mutation variables for createCustomerConnector invalid!")
    }

    const query = `
      INSERT INTO Customers (fname, lname, email) 
      VALUES ($fname, $lname, $email)
    `
    
    await db.query(query, {
      bind: {
        fname,
        lname,
        email,
      },
      type: QueryTypes.INSERT,
    })
    
    return {
      success: true,
      message: `New customer ${fname} ${lname} was created!`
    }
  } catch(error) {
    throw new ApolloError(`Error in createCustomerConnector: ${error}`)
  }
}