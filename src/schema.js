const { buildSchema } = require("graphql");

const schema = buildSchema(`
  scalar myDate

  type Query {
    info: String!
    feed: [Link]!
    link(id: ID!): Link
  }

  type Mutation {
    postLink(url: String!, description: String!): Link!
    updateLink(id: ID!, url: String, description: String): Link
    deleteLink(id: ID!): Link
  }

  type Link {
    id: ID!
    description: String!
    url: String!
    createdAt: myDate
    updatedAt: myDate
    postedBy: User
  }

  type AuthPayload {
    token: String
    user: User
  }

  type User {
    id: ID!
    name: String!
    email: String!
    links: [Link]!
  }
`);

module.exports = schema;
