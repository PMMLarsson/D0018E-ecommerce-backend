import { ApolloError } from 'apollo-server-express'
import { QueryTypes } from 'sequelize'

export const isAdminConnector = async ({db}, id) => {
  try {
    const query = `
      SELECT
        *
      FROM Admins
      WHERE customer_id = $id
    `
    const res = await db.query(query, {
      bind: { id },
      type: QueryTypes.SELECT,
    })
    if (!res) {
      throw new ApolloError('res undefined when querying getAdminsConnector')
    }
    if(res.length === 0) {
      return false
    }
    
    return true
  } catch(error) {
    throw new ApolloError(`Error in getAdminsConnector: ${error}`)
  }
}