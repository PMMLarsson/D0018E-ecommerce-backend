import { ApolloError } from 'apollo-server-express'
import { QueryTypes } from 'sequelize'

export const getAssetsConnector = async ({ db }) => {
  try {
    const query = `
      SELECT
        *
      FROM Assets
    `
    const res = await db.query(query, {
      type: QueryTypes.SELECT,
    })
    if (!res) {
      throw new ApolloError('res undefined when querying getAssetsConnector')
    }
    
    return res
  } catch(error) {
    throw new ApolloError(`Error in getAssetsConnector: ${error}`)
  }
}

export const increaseAssetConnector = async ({ db }, type, amount) => {
  try {
    if(!type || !amount || type === "" || amount < 0) {
      throw new ApolloError("Mutation variables for increaseAssetConnector invalid!")
    }

    const query = `
      UPDATE Assets
      SET amount = amount + $amount
      WHERE type = $type
    `
    await db.query(query, {
      bind: {
        amount,
        type,
      },
      type: QueryTypes.UPDATE,
    })
    
    return {
      success: true,
      message: `Asset ${type} was increase by ${amount}!`
    }
  } catch(error) {
    throw new ApolloError(`Error in increaseAssetConnector: ${error}`)
  }
}

export const decreaseAssetConnector = async ({ db }, type, amount) => {
  try {
    if(!type || !amount || type === "" || amount < 0) {
      throw new ApolloError("Mutation variables for decreaseAssetConnector invalid!")
    }

    // Make sure that a decrease wont decrease the asset below 0
    const selectAsset = 
    `SELECT
      amount
      FROM Assets
      WHERE type = $type
    `
    const res = await db.query(selectAsset, {
      bind: {
        type,
      },
      type: QueryTypes.SELECT,
    })

    if(!res) {
      throw new ApolloError('res undefined when querying for specific assets in decreaseAssetConnector mutation')
    }

    if(res[0].amount - amount < 0) {
      throw new ApolloError('Cannot decrease an Asset amount below 0!')
    }
    // IMPLEMENT CHECK FOR OK AMOUNT-AMOUNT
       
    const query = `
      UPDATE Assets
      SET amount = amount - $amount
      WHERE type = $type
    `
    await db.query(query, {
      bind: {
        amount,
        type,
      },
      type: QueryTypes.UPDATE,
    })
    
    return {
      success: true,
      message: `Asset ${type} was decreased by ${amount}!`
    }
  } catch(error) {
    throw new ApolloError(`Error in decreaseAssetConnector: ${error}`)
  }
}

export const createAssetConnector = async ({ db }, type, amount, cost, currency, description) => {
  try {
    if(!type || !amount || !cost || !currency || !description) {
      throw new ApolloError("Mutation variables for createAssetConnector invalid!")
    }

    if(type === "" || amount < 0 || cost < 0 || currency === "") {
      throw new ApolloError("Mutation variables for createAssetConnector invalid!")
    }

    // Make sure that asset do not already exist
    const selectAsset = 
    `SELECT
      *
      FROM Assets
      WHERE type = $type
    `
    const res = await db.query(selectAsset, {
      bind: {
        type,
      },
      type: QueryTypes.SELECT,
    })

    if(!res) {
      throw new ApolloError('res undefined when querying for specific assets in createAssetConnector mutation')
    }

    if(res.length > 0) {
      throw new ApolloError(`Asset with type=${type} already exists in database!`)
    }
    // IMPLEMENT CHECK FOR EXISTING ASSET
       
    const query = `
      INSERT INTO Assets (type, amount, cost, currency, description) 
      VALUES ($type, $amount, $cost, $currency, $description)
    `
    await db.query(query, {
      bind: {
        type,
        amount,
        cost:cost*100,
        currency,
        description
      },
      type: QueryTypes.insert,
    })
    
    return {
      success: true,
      message: `${amount} nr of Asset ${type} was created!`
    }
  } catch(error) {
    throw new ApolloError(`Error in createAssetConnector: ${error}`)
  }
}