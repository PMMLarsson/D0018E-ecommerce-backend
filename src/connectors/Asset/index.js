import { ApolloError } from 'apollo-server-express'
import { QueryTypes } from 'sequelize'

export const getAssetsConnector = async ({ db }) => {
  try {
    const query = `
      SELECT
        type,
        amount,
        cost/100 as cost,
        currency,
        description
      FROM Assets
      ORDER BY type DESC
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

export const assetByTypeConnector = async ({ db }, type) => {
  try {
    const query = `
      SELECT
        type,
        amount,
        cost/100 as cost,
        currency,
        description
      FROM Assets
      WHERE type = $type
    `
    const res = await db.query(query, {
      bind: { type },
      type: QueryTypes.SELECT,
    })
    if (!res) {
      throw new ApolloError('res undefined when querying assetsByTypeConnector')
    }

    return res[0]
  } catch(error) {
    throw new ApolloError(`Error in assetsByTypeConnector: ${error}`)
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

export const editAssetConnector = async ({ db }, type, amount, cost, currency, description) => {
  try {
    if(!type || !currency || !description) {
      throw new ApolloError("Mutation variables for editAssetConnector invalid!")
    }

    if(type === "" || amount < 0 || cost < 0 || currency === "") {
      throw new ApolloError("Mutation variables for editAssetConnector invalid!")
    }

    const query = `
      UPDATE Assets
      SET
        amount = $amount,
        cost = $cost,
        currency = $currency,
        description = $description
      WHERE type = $type
    `
    await db.query(query, {
      bind: {
        type,
        amount,
        cost:cost*100,
        currency,
        description
      },
      type: QueryTypes.UPDATE,
    })
    
    return {
      success: true,
      message: `Asset ${type} was updated!`
    }
  } catch(error) {
    throw new ApolloError(`Error in editAssetConnector: ${error}`)
  }
}