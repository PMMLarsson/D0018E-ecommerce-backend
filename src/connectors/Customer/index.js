import { ApolloError } from 'apollo-server-express'
import { QueryTypes } from 'sequelize'
import * as bcrypt from 'bcryptjs'

import { isAdminConnector } from "../Admin"

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
    
    return res[0]
  } catch(error) {
    throw new ApolloError(`Error in getCustomerConnector: ${error}`)
  }
}

export const createCustomerConnector = async ({ db }, fname, lname, email, password) => {
  try {
    if(!fname || fname === "" || !lname || lname === "" || !email || email === "" || !password || password.length < 7 || password.length > 255) {
      throw new ApolloError("Mutation variables for createCustomerConnector invalid!")
    }

    email = email.toLowerCase()

    // Hash password
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)

    const query = `
      INSERT INTO Customers (fname, lname, email, password_hash) 
      VALUES ($fname, $lname, $email, $hash)
      RETURNING id
    `
    
    const res = await db.query(query, {
      bind: {
        fname,
        lname,
        email,
        hash
      },
      type: QueryTypes.INSERT,
    })
    return {
      id: res[0][0].id,
      success: true,
      isAdmin: false,
      message: `Welcome ${fname}!`
    }
  } catch(error) {
    throw new ApolloError(`Error in createCustomerConnector: ${error}`)
  }
}

export const loginConnector = async (context, email, password) => {
  try {
    if(!email || email === "" || !password || password.length === 0) {
      throw new ApolloError("Query variables for login invalid!")
    }

    email = email.toLowerCase()

    const query = `
      SELECT
        id,
        password_hash 
      FROM Customers
      WHERE email=$email
    `
    
    const res = await context.db.query(query, {
      bind: {
        email,
      },
      type: QueryTypes.SELECT,
    })

    if(!res|| res.length === 0) {
      return {
        id: undefined,
        success: false,
        isAdmin: false,
        message: `Cannot find customer by that email!`
      }
    }

    // Compare password with hashed password stored in DB

    if(!bcrypt.compareSync(password, res[0].password_hash)) {
      return {
        id: undefined,
        success: false,
        message: `Password incorrect!`
      }
    }

    const isAdmin = await isAdminConnector(context, res[0].id)
    
    return {
      id:res[0].id,
      success: true,
      isAdmin,
      message: `You were successfully logged in!`
    }
  } catch(error) {
    throw new ApolloError(`Error in loginConnector: ${error}`)
  }
}