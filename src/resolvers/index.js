import { getAdmins } from '../connectors/'

export const resolvers = {
  Query: {
    admins: async (parent, args, context) => {
      return getAdmins(context)
    },
  }
}

export default resolvers