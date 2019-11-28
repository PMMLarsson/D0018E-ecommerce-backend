import { ApolloError } from 'apollo-server-express'
import { QueryTypes } from 'sequelize'

export const commentsConnector = async ({ db }, asset_type) => {
  try {
    const query = `
      SELECT
        *
      FROM Comments
      WHERE asset_type = $asset_type
    `
    const res = await db.query(query, {
      bind: {
        asset_type
      },
      type: QueryTypes.SELECT,
    })
    if (!res) {
      throw new ApolloError('res undefined when querying commentsConnector')
    }

    return res
  } catch(error) {
    throw new ApolloError(`Error in commentsConnector: ${error}`)
  }
}

export const addCommentConnector = async ({ db }, asset_type, customer_id, contents) => {
  try {
    const query = `
      INSERT INTO Comments (customer_id, asset_type, date, contents)
      VALUES ($customer_id, $asset_type, NOW() AT TIME ZONE 'UTC', $contents)
    `
    await db.query(query, {
      bind: {
        asset_type,
        customer_id,
        contents
      },
      type: QueryTypes.INSERT,
    })

    return {
      success: true,
      message: `New comment created for ${asset_type}.`
    }
  } catch(error) {
    throw new ApolloError(`Error in addCommentConnector: ${error}`)
  }
}

export const editCommentConnector = async ({ db }, id, contents) => {
  try {
    const query = `
      UPDATE Comments
      SET
        date = NOW() AT TIME ZONE 'UTC',
        contents = $contents
      WHERE id = $id
    `
    await db.query(query, {
      bind: {
        id,
        contents
      },
      type: QueryTypes.UPDATE,
    })

    return {
      success: true,
      message: `Comment with id ${id} edited.`
    }
  } catch(error) {
    throw new ApolloError(`Error in editCommentConnector: ${error}`)
  }
}

export const deleteCommentConnector = async ({ db }, id) => {
  try {
    const query = `
      DELETE FROM Comments
      WHERE id = $id
    `
    await db.query(query, {
      bind: {
        id
      },
      type: QueryTypes.DELETE,
    })

    return {
      success: true,
      message: `Comment with id ${id} deleted.`
    }
  } catch(error) {
    throw new ApolloError(`Error in deleteCommentConnector: ${error}`)
  }
}