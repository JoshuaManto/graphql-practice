const { GraphQLScalarType } = require("graphql");

const { Link } = require("./model/model.js");

let links = [
  {
    id: "link-0",
    url: "www.howtographql.com",
    description: "Fullstack tutorial for GraphQL"
  }
];
let linksCount = links.length;

const resolvers = {
  info: () => {
    // return null;
    return "This is an API of a Hackernews Clone!";
  },

  feed: async () => {
    // return links;
    // Link.find({}, (err, links) => {
    //   if (err) console.log("Error: ", err);

    //   console.log(Array.isArray(links));
    //   console.log(links);
    //   return links;
    // });
    const links = await Link.find({})
      .populate()
      .exec();

    console.log(links);
    console.log(links[0].createdAt);

    return links.map(link => ({
      id: link._id,
      description: link.description,
      url: link.url,
      createdAt: link.createdAt,
      updatedAt: link.updatedAt
      // createdAt: new GraphQLDateTime(link.createdAt)
    }));
  },

  link: async args => {
    console.log(args);
    const linkId = args.id;
    console.log(linkId);

    return await Link.findById(linkId, (err, res) => {
      if (err) console.log("Error: ", err);
      console.log(res);
    }).exec();

    // for (let link of links) {
    //   console.log(link);
    //   if (link.id === args.id) {
    //     return link;
    //   }
    // }
    // throw new Error("no link exists with id ", args.id);
  },

  postLink: args => {
    const newLink = new Link({
      // id: `link-${linksCount++}`,
      description: args.description,
      url: args.url
    });

    return new Promise((resolve, reject) => {
      newLink.save((err, res) => {
        err ? reject(err) : resolve(res);
      });
    });

    // return Link.create(link, (err, result) => {
    //   if (err) console.log("Error: ", err);

    //   console.log(result);

    //   console.log(result._id);
    //   console.log(typeof result._id);
    //   console.log(result.description);
    //   console.log(typeof result.description);
    //   console.log(result.url);
    //   console.log(typeof result.url);
    //   console.log(result.createdAt);
    //   console.log(typeof result.createdAt);
    //   console.log(result.updatedAt);
    //   console.log(typeof result.updatedAt);

    //   // const newLink = {
    //   //   id: result._id,
    //   //   description: result.description,
    //   //   url: result.url
    //   // };
    //   // console.log(newLink);
    //   // return newLink;
    // });

    // links.push(link);
    // return link;
  },

  updateLink: async ({ id, ...args }) => {
    console.log(id);
    console.log(args);

    // const arguments = {
    //   url: args.url,
    //   description: args
    // }

    return new Promise((resolve, reject) => {
      Link.findByIdAndUpdate(id, { $set: { ...args } }, { new: true }).exec(
        (err, res) => {
          console.log(err);
          console.log(res);
          err ? reject(err) : resolve(res);
        }
      );
    });

    // for (let i = 0; i < links.length; i++) {
    //   if (args.id === links[i].id) {
    //     links[i].url = args.url;
    //     links[i].description = args.description;

    //     return links[i];
    //   }
    // }
    // throw new Error("no link exists with id ", args.id);
  },

  deleteLink: args => {
    console.log(args);
    console.log(args.id);

    return new Promise((resolve, reject) => {
      Link.findByIdAndRemove(args.id).exec((err, link) => {
        err ? reject(err) : resolve(link);
      });
    });
    // for (let i = 0; i < links.length; i++) {
    //   if (args.id === links[i].id) {
    //     const copy = links[i];

    //     links.splice(i, 1);
    //     console.log(links);
    //     return copy;
    //   }
    // }
    // throw new Error("no link exists with id ", args.id);
  },

  Link: {
    id: parent => parent.id,
    description: parent => parent.description,
    url: parent => parent.url
  },
  MyDate: new GraphQLScalarType({
    name: "Date",
    description: "Date custom scalar type",
    parseValue(value) {
      return new Date(value); // value from the client
    },
    serialize(value) {
      return value.getTime(); // value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return parseInt(ast.value, 10); // ast value is always in string format
      }
      return null;
    }
  })
};

module.exports = resolvers;
