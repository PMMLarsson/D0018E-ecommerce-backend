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

    email = email.toLowerCase()

    const query = `
      INSERT INTO Customers (fname, lname, email) 
      VALUES ($fname, $lname, $email)
      RETURNING id
    `
    
    const res = await db.query(query, {
      bind: {
        fname,
        lname,
        email,
      },
      type: QueryTypes.INSERT,
    })
    return {
      id: res[0][0].id,
      message: `Welcome ${fname}!`
    }
  } catch(error) {
    throw new ApolloError(`Error in createCustomerConnector: ${error}`)
  }
}

export const loginConnector = async ({ db }, email) => {
  try {
    if(!email || email === "") {
      throw new ApolloError("Query variables for login invalid!")
    }

    email = email.toLowerCase()

    const query = `
      SELECT id 
      FROM Customers
      WHERE email=$email
    `
    
    const res = await db.query(query, {
      bind: {
        email,
      },
      type: QueryTypes.SELECT,
    })

    if(!res|| res.length === 0) {
      return {
        id:undefined,
        message: `Unable to login.`
      }
    }
    
    return {
      id:res[0].id,
      message: `You were successfully logged in!`
    }
  } catch(error) {
    throw new ApolloError(`Error in loginConnector: ${error}`)
  }
}