import { GraphQLBoolean, GraphQLID, GraphQLInt, GraphQLObjectType } from 'graphql';
import { user } from './user.js';
import { memberType } from './memberType.js';

export const profile: GraphQLObjectType = new GraphQLObjectType({
  name: 'Profile',
  fields: () => ({
    id: { type: GraphQLID },
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    user: { type: user },
    memberType: { type: memberType },
  }),
});
