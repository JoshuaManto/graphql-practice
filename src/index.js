const express = require("express");
const graphqlHTTP = require("express-graphql");
const { graphql, buildSchema } = require("graphql");

const PORT = 3000;

const app = express();

// Schema

// const schema = buildSchema(`
//   type Query {
//     users: [User!]!
//     user(id: ID!): User
//   }

//   type Mutation {
//     createUser(name: String!): User!
//   }

//   type User {
//     id: ID!
//     name: String!
//   }
// `);

const schema = buildSchema(`
  type Query {
    info: String!
    feed: [Link]!
  }

  type Link {
    id: ID!
    description: String!
    url: String!
  }
`);

let links = [
  {
    id: "link-0",
    url: "www.howtographql.com",
    description: "Fullstack tutorial for GraphQL"
  }
];

// Resolver
const resolver = {
  info: () => {
    // return null;
    return "This is an API of a Hackernews Clone!";
  },

  feed: () => {
    return links;
  },

  Link: {
    id: parent => parent.id,
    description: parent => parent.description,
    url: parent => parent.url
  }
};

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: resolver,
    graphiql: true
  })
);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});

module.exports = app;

// graphql(schema, "{ info }", resolver).then(res => {
//   console.log(res);
// });
