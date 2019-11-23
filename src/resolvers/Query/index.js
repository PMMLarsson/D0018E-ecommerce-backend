import { getAdminsConnector } from '../../connectors/Admin'
import { getAssetsConnector } from '../../connectors/Asset'
import { getOrdersConnector } from '../../connectors/Order'
import { getCustomerByIdConnector, loginConnector } from '../../connectors/Customer'

export const Query = {
  admins: async (parent, args, context) => {
    return getAdminsConnector(context)
  },
  assets: async (parent, args, context) => {
    return getAssetsConnector(context)
  },
  orders: async (parent, { id }, context) => {
    return getOrdersConnector(context, id)
  },
  getCustomer: async (parent, { id }, context) => {
    return getCustomerByIdConnector(context, id)
  },
  login: async (parend, { email}, context) => {
    return loginConnector(context, email)
  }
}

export default Query