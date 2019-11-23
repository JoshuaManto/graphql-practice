const express = require("express");
const graphqlHTTP = require("express-graphql");
const { graphql, buildSchema } = require("graphql");

const PORT = 3000;

const app = express();

// Schema
const schema = buildSchema(`
  type Query {
    info: String!
  }
`);

// Resolver
const resolver = {
  info: () => {
    return null;
    // return "This is an API of a Hackernews Clone!";
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
