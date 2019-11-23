const { buildSchema } = require("graphql");

const schema = buildSchema(`
  type Query {
    info: String!
    feed: [Link]!
    link(id: ID!): Link
  }

  type Mutation {
    post(url: String!, description: String!): Link!
    update(id: ID!, url: String, description: String): Link
    delete(id: ID!): Link
  }

  type Link {
    id: ID!
    description: String!
    url: String!
  }
`);

module.exports = schema;
