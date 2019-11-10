import { ApolloError } from 'apollo-server-express'
import { QueryTypes } from 'sequelize'

export const getAdminsConnector = async ({db}) => {
  try {
    const query = `
      SELECT
        *
      FROM Admins
    `
    const res = await db.query(query, {
      type: QueryTypes.SELECT,
    })
    if (!res) {
      throw new ApolloError('res undefined when querying getAdminsConnector')
    }
    
    return res
  } catch(error) {
    throw new ApolloError(`Error in getAdminsConnector: ${error}`)
  }
}