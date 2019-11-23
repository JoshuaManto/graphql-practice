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

  feed: () => {
    return links;
  },

  link: args => {
    console.log(args);

    for (let link of links) {
      console.log(link);
      if (link.id === args.id) {
        return link;
      }
    }
    throw new Error("no link exists with id ", args.id);
  },

  post: args => {
    const link = {
      id: `link-${linksCount++}`,
      description: args.description,
      url: args.url
    };
    links.push(link);
    return link;
  },

  update: args => {
    console.log(args);
    for (let i = 0; i < links.length; i++) {
      if (args.id === links[i].id) {
        links[i].url = args.url;
        links[i].description = args.description;

        return links[i];
      }
    }
    throw new Error("no link exists with id ", args.id);
  },

  delete: args => {
    for (let i = 0; i < links.length; i++) {
      if (args.id === links[i].id) {
        const copy = links[i];

        links.splice(i, 1);
        console.log(links);
        return copy;
      }
    }
    throw new Error("no link exists with id ", args.id);
  },

  Link: {
    id: parent => parent.id,
    description: parent => parent.description,
    url: parent => parent.url
  }
};

module.exports = resolvers;
