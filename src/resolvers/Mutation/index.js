import { increaseAssetConnector, decreaseAssetConnector, createAssetConnector } from '../../connectors/Asset'
import { createCustomerConnector } from '../../connectors/Customer'
import { createOrderConnector } from '../../connectors/Order'

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
    createOrder: async (parent, { buyer, metadata, total_cost, currency }, context) => {
      return createOrderConnector(context, buyer, metadata, total_cost, currency)
    },
}

export default Mutation