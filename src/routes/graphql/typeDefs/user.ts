import {
  GraphQLFloat,
  GraphQLID,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { profile } from './profile.js';
import { post } from './post.js';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const user: GraphQLObjectType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
    profile: { type: profile },
    posts: { type: new GraphQLList(post) },
    userSubscribedTo: {
      type: new GraphQLList(user),
      args: {
        id: { type: GraphQLID }
      },
      resolve({ id }: { id: string }) {
        return prisma.user.findMany({
            where: {
              subscribedToUser: {
                some: {
                  subscriberId: id,
                },
              },
            },
          });
      },
    },
    subscribedToUser: {
      type: new GraphQLList(user),
      args: {
        id: { type: GraphQLID }
      },
      resolve({ id }: { id: string }) {
        return prisma.user.findMany({
            where: {
              userSubscribedTo: {
                some: {
                  authorId: id,
                },
              },
            },
          });
      },
    },
  }),
});
