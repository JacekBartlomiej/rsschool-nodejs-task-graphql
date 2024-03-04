import { GraphQLObjectType } from 'graphql';
import { user } from './user.js';

export const subscriberOnAuthor: GraphQLObjectType = new GraphQLObjectType({
  name: 'SubscriberOnAuthor',
  fields: () => ({
    subscriber: { type: user },
    author: { type: user },
  }),
});
