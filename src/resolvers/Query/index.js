import { getAdminsConnector } from '../../connectors/Admin'
import { getAssetsConnector, assetByTypeConnector } from '../../connectors/Asset'
import { getOrdersConnector } from '../../connectors/Order'
import { getCustomerByIdConnector, loginConnector } from '../../connectors/Customer'
import { commentsConnector } from '../../connectors/Comment'
import { gradeConnector } from '../../connectors/Grade'
import { cartConnector, cartSizeConnector } from '../../connectors/Cart'

export const Query = {
  admins: async (parent, args, context) => {
    return getAdminsConnector(context)
  },
  assets: async (parent, args, context) => {
    return getAssetsConnector(context)
  },
  assetByType: async (parent, { type }, context) => {
    return assetByTypeConnector(context, type)
  },
  orders: async (parent, { id }, context) => {
    return getOrdersConnector(context, id)
  },
  getCustomer: async (parent, { id }, context) => {
    return getCustomerByIdConnector(context, id)
  },
  login: async (parent, { email, password }, context) => {
    return loginConnector(context, email, password)
  },
  comments: async (parent, { asset_type }, context) => {
    return commentsConnector(context, asset_type)
  },
  grade: async (parent, { asset_type, customer_id, grade }, context) => {
    return gradeConnector(context, asset_type, customer_id, grade)
  },
  cart: async (parent, { customer_id }, context) => {
    return cartConnector(context, customer_id)
  },
  cartSize: async (parent, { customer_id }, context) => {
    return cartSizeConnector(context, customer_id)
  }
}

export default Query