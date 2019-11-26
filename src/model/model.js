const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const {
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLObjectType,
  GraphQLNonNull
} = require("graphql");

// const { GraphQLDateTime } = require("graphql-iso-date");

const myURI =
  "mongodb+srv://admin:admin@cluster0-zvnqd.mongodb.net/test?retryWrites=true&w=majority";

const URI = process.env.MONGO_URI || myURI;

mongoose
  .connect(URI, {
    // options for the connect method to parse the URI
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // sets the name of the DB that our collections are part of
    dbName: "graphql-practice"
  })
  .then(() => console.log(`Connected to Mongo DB`))
  .catch(err => console.log(err));

const LinkSchema = new Schema(
  {
    description: String,
    url: String,
    postedBy: String // user id
  },
  {
    timestamps: true
  }
);

const Link = mongoose.model("links", LinkSchema);

const UserSchema = new Schema({
  name: String,
  email: String,
  password: String,
  links: [LinkSchema]
});

const User = mongoose.model("users", UserSchema);

// const linkType = new GraphQLObjectType({
//   name: "Link",
//   fields: {
//     id: { type: GraphQLID },
//     description: { type: GraphQLString },
//     url: { type: GraphQLString }
//     // createdAt: {}
//   }
// });

module.exports = { Link, User };
