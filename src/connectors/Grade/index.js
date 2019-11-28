import { ApolloError } from 'apollo-server-express'
import { QueryTypes } from 'sequelize'

export const gradeConnector = async ({ db }, asset_type) => {
  try {
    const query = `
      SELECT
        AVG(grade)
      FROM grading
      WHERE asset_type = $asset_type
    `
    const res = await db.query(query, {
      bind: {
        asset_type
      },
      type: QueryTypes.SELECT,
    })
    if (!res) {
      throw new ApolloError('res undefined when querying gradeConnector')
    }
    if(res[0].avg === null) {
      res[0].avg = 0
    }

    return res[0].avg
  } catch(error) {
    throw new ApolloError(`Error in gradeConnector: ${error}`)
  }
}

export const updateGradeConnector = async ({ db }, asset_type, customer_id, grade) => {
  try {
    const query = `
    INSERT INTO grading
    VALUES ($customer_id, $asset_type, $grade, NOW() AT TIME ZONE 'UTC')
    ON CONFLICT (customer_id, asset_type) DO UPDATE
        SET customer_id = $customer_id,
            asset_type = $asset_type,
            grade = $grade,
            date = NOW() AT TIME ZONE 'UTC'
    `
    await db.query(query, {
      bind: {
        asset_type,
        customer_id,
        grade
      },
      type: QueryTypes.INSERT,
    })

    return {
      success: true,
      message: `New grade created for ${asset_type}.`
    }
  } catch(error) {
    throw new ApolloError(`Error in updateGradeConnector: ${error}`)
  }
}