const {defaultFieldResolver} = require("graphql");
const { SchemaDirectiveVisitor, AuthenticationError } = require('apollo-server')

class IsAuthenticatedDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field, details) {
    const {resolve = defaultFieldResolver} = field;
    field.resolve = async function(...args) {
      const [, , context] = args
      if (!context.user) {
        throw new AuthenticationError('Not Authorized')
      }
      return resolve.apply(this, args)
    }
  }
}

module.exports = {
  IsAuthenticatedDirective
}