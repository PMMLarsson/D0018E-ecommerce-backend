import { increaseAssetConnector, decreaseAssetConnector, createAssetConnector } from '../../connectors/Asset'
import { createCustomerConnector } from '../../connectors/Customer'
import { createOrderConnector } from '../../connectors/Order'
import { addCommentConnector, editCommentConnector, deleteCommentConnector } from '../../connectors/Comment'
import { addGradeConnector, editGradeConnector } from '../../connectors/Grade'
import { updateCartConnector, clearCartConnector } from '../../connectors/Cart'

export const Mutation = {
    increaseAsset: async (parent, { type, amount }, context) => {
      return increaseAssetConnector(context, type, amount)
    },
    decreaseAsset: async (parent, { type, amount }, context) => {
      return decreaseAssetConnector(context, type, amount)
    },
    createAsset: async (parent, { type, amount, cost, currency, description }, context) => {
      return createAssetConnector(context, type, amount, cost, currency, description)
    },
    createCustomer: async (parent, { fname, lname, email }, context) => {
      return createCustomerConnector(context, fname, lname, email)
    },
    createOrder: async (parent, { customer_id, metadata, total_cost, currency }, context) => {
      return createOrderConnector(context, customer_id, metadata, total_cost, currency)
    },
    addComment: async (parent, { asset_type, customer_id, contents }, context) => {
      return addCommentConnector(context, asset_type, customer_id, contents)
    },
    editComment: async (parent, { id, contents }, context) => {
      return editCommentConnector(context, asset_type, customer_id, contents)
    },
    deleteComment: async (parent, { id }, context) => {
      return deleteCommentConnector(context, asset_type, customer_id)
    },
    addGrade: async (parent, { asset_type, customer_id, grade }, context) => {
      return addGradeConnector(context, asset_type, customer_id, grade)
    },
    editGrade: async (parent, { asset_type, customer_id, grade }, context) => {
      return editGradeConnector(context, asset_type, customer_id, grade)
    },
    updateCart: async (parent, { customer_id, contents, total_amount }, context) => {
      return updateCartConnector(context, customer_id, contents, total_amount)
    },
    clearCart: async (parent, { customer_id }, context) => {
      return clearCartConnector(context, customer_id)
    },
}

export default Mutation