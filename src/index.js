const express = require("express");
const graphqlHTTP = require("express-graphql");
const { graphql, buildSchema } = require("graphql");

const schema = require("./schema.js");
const resolvers = require("./resolvers.js");

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

// const schema = buildSchema(`
//   type Query {
//     info: String!
//     feed: [Link]!
//   }

//   type Mutation {
//     post(url: String!, descripton: String!): Link!
//   }

//   type Link {
//     id: ID!
//     description: String!
//     url: String!
//   }
// `);

// let links = [
//   {
//     id: "link-0",
//     url: "www.howtographql.com",
//     description: "Fullstack tutorial for GraphQL"
//   }
// ];
// let linksCount = links.length;

// Resolver
// const resolvers = {
//   info: () => {
//     // return null;
//     return "This is an API of a Hackernews Clone!";
//   },

//   feed: () => {
//     return links;
//   },

//   link: args => {
//     console.log(args);

//     for (let link of links) {
//       console.log(link);
//       if (link.id === args.id) {
//         return link;
//       }
//     }
//     throw new Error("no link exists with id ", args.id);
//   },

//   post: args => {
//     const link = {
//       id: `link-${linksCount++}`,
//       description: args.description,
//       url: args.url
//     };
//     links.push(link);
//     return link;
//   },

//   update: args => {
//     console.log(args);
//     for (let i = 0; i < links.length; i++) {
//       if (args.id === links[i].id) {
//         links[i].url = args.url;
//         links[i].description = args.description;

//         return links[i];
//       }
//     }
//     throw new Error("no link exists with id ", args.id);
//   },

//   delete: args => {
//     for (let i = 0; i < links.length; i++) {
//       if (args.id === links[i].id) {
//         const copy = links[i];

//         links.splice(i, 1);
//         console.log(links);
//         return copy;
//       }
//     }
//     throw new Error("no link exists with id ", args.id);
//   },

//   Link: {
//     id: parent => parent.id,
//     description: parent => parent.description,
//     url: parent => parent.url
//   }
// };

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
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

// Queries

// Simple Query
// query {
//   feed {
//     id
//     url
//     description
//   }
// }
