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

    return res
  } catch(error) {
    throw new ApolloError(`Error in gradeConnector: ${error}`)
  }
}

export const addGradeConnector = async ({ db }, asset_type, customer_id, grade) => {
  try {
    const query = `
      INSERT INTO Grading
      VALUES ($customer_id, $asset_type, NOW() AT TIME ZONE 'UTC', $grade)
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
    throw new ApolloError(`Error in addGradeConnector: ${error}`)
  }
}

export const editGradeConnector = async ({ db }, asset_type, customer_id, grade) => {
  try {
    const query = `
      UPDATE Grading
      SET
        date = NOW() AT TIME ZONE 'UTC',
        grade = $grade
      WHERE asset_type = $asset_type and customer_id = $customer_id
    `
    await db.query(query, {
      bind: {
        asset_type,
        customer_id,
        grade
      },
      type: QueryTypes.UPDATE,
    })

    return {
      success: true,
      message: `Grade for ${asset_type} edited.`
    }
  } catch(error) {
    throw new ApolloError(`Error in editGradeConnector: ${error}`)
  }
}