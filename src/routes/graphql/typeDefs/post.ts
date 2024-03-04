import { GraphQLID, GraphQLObjectType, GraphQLString } from 'graphql';
import { user } from './user.js';

export const post: GraphQLObjectType = new GraphQLObjectType({
  name: 'Post',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    author: { type: user },
    authorId: { type: GraphQLID },
  }),
});
