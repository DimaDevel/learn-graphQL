const { GraphQLServer } = require('graphql-yoga');


let links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
}, {
    id: 'link-1',
    url: 'www.google.com',
    description: 'this is test sample.'
}];

let idCount = links.length;
const resolvers = {
    Query: {
        info: () => `This is the API of a Hackernews Clone`,
        feed: () => links,
        link: (parent, { id }) => {
        	return `this is id -> ${id}`;
        },
    },
     Mutation:{
    	post: (parent, args) => {
    		const link = {
    			id: `link-${idCount++}`,
    			description: args.description,
    			url: args.url,
    		};
    		links.push(link);

    		return link;
    	},
    	// updateLink: (parent, args) => {

    	// },
    	// deleteLink: (parent, args) => {

    	// }
    },
};

const server = new GraphQLServer({
    typeDefs: './schema.graphql',
    resolvers,
});
server.start(() => console.log(`Server is running on http://localhost:4000`));