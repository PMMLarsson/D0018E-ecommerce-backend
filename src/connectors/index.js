import { ApolloError } from 'apollo-server-express'
import { QueryTypes } from 'sequelize'

export const getAdmins = async ({db}) => {
  try {
    const query = `
    SELECT * from Admins
    `

    const res = await db.query(query, {
      type: QueryTypes.SELECT,
    })
    if (!res) {
      throw new ApolloError('No result from getAdmins')
    }
    
    
    return res
  } catch(error) {
    throw new ApolloError("Error in getAdmins: ", error)
  }
}