import { createAssetConnector, editAssetConnector } from '../../connectors/Asset'
import { createCustomerConnector } from '../../connectors/Customer'
import { createOrderConnector } from '../../connectors/Order'
import { addCommentConnector, editCommentConnector, deleteCommentConnector } from '../../connectors/Comment'
import { updateGradeConnector } from '../../connectors/Grade'
import { updateCartConnector, clearCartConnector } from '../../connectors/Cart'

export const Mutation = {
    createAsset: async (parent, { type, amount, cost, currency, description }, context) => {
      return createAssetConnector(context, type, amount, cost, currency, description)
    },
    editAsset: async (parent, { type, amount, cost, currency, description }, context) => {
      return editAssetConnector(context, type, amount, cost, currency, description)
    },
    createCustomer: async (parent, { fname, lname, email, password }, context) => {
      return createCustomerConnector(context, fname, lname, email, password)
    },
    createOrder: async (parent, { customer_id, metadata, total_cost, currency }, context) => {
      return createOrderConnector(context, customer_id, metadata, total_cost, currency)
    },
    addComment: async (parent, { asset_type, customer_id, contents, by_name }, context) => {
      return addCommentConnector(context, asset_type, customer_id, contents, by_name)
    },
    editComment: async (parent, { id, contents }, context) => {
      return editCommentConnector(context, id, contents)
    },
    deleteComment: async (parent, { id }, context) => {
      return deleteCommentConnector(context, id)
    },
    updateGrade: async (parent, { asset_type, customer_id, grade }, context) => {
      return updateGradeConnector(context, asset_type, customer_id, grade)
    },
    updateCart: async (parent, { customer_id, contents, total_amount }, context) => {
      return updateCartConnector(context, customer_id, contents, total_amount)
    },
    clearCart: async (parent, { customer_id }, context) => {
      return clearCartConnector(context, customer_id)
    },
}

export default Mutation