import { isAdminConnector } from '../../connectors/Admin'
import { getAssetsConnector, assetByTypeConnector, searchConnector } from '../../connectors/Asset'
import { getOrdersConnector } from '../../connectors/Order'
import { getCustomerByIdConnector, loginConnector } from '../../connectors/Customer'
import { commentsConnector } from '../../connectors/Comment'
import { gradeConnector } from '../../connectors/Grade'
import { cartConnector, cartSizeConnector } from '../../connectors/Cart'

export const Query = {
 isAdmin: async (parent, { id }, context) => {
    return isAdminConnector(context, id)
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
  },
  search: async (parent, { input }, context) => {
    return searchConnector(context, input)
  }
}

export default Query