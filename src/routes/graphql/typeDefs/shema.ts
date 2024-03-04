import { PrismaClient } from '@prisma/client';
import { GraphQLList, GraphQLObjectType, GraphQLSchema } from 'graphql';
import { MemberTypeId } from '../../member-types/schemas.js';
import { UUIDType } from '../types/uuid.js';
import { memberType, memberTypeId } from './memberType.js';
import { post } from './post.js';
import { user } from './user.js';
import { profile } from './profile.js';

const prisma = new PrismaClient();

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    memberTypes: {
      type: new GraphQLList(memberType),
      resolve: () => prisma.memberType.findMany(),
    },
    memberType: {
      type: memberType,
      args: {
        id: { type: memberTypeId },
      },
      resolve: (_, { id }: { id: MemberTypeId }) =>
        prisma.memberType.findUnique({
          where: {
            id,
          },
        }),
    },
    posts: {
      type: new GraphQLList(post),
      resolve: () => prisma.post.findMany(),
    },
    post: {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      type: post,
      args: {
        id: { type: UUIDType },
      },
      resolve: (_, { id }: { id: string }) =>
        prisma.post.findUnique({
          where: {
            id,
          },
        }),
    },
    users: {
      type: new GraphQLList(user),
      resolve: () =>
        prisma.user.findMany({
          include: {
            profile: {
              include: {
                memberType: true,
              },
            },
            posts: true,
          },
        }),
    },
    user: {
      type: user,
      args: {
        id: { type: UUIDType },
      },
      resolve: (_, { id }: { id: string }) =>
        prisma.user.findUnique({
          where: {
            id,
          },
          include: {
            profile: {
              include: {
                memberType: true,
              }
            },
            userSubscribedTo: {
              include: {
                subscriber: {
                  select: {
                    subscribedToUser: true
                  }
                }
              }
            },
            subscribedToUser: {
              include: {
                author: {
                  select: {
                    userSubscribedTo: true
                  }
                }
              }
            },
            posts: true,
          },
        }),
    },
    profiles: {
      type: new GraphQLList(profile),
      resolve: () => prisma.profile.findMany(),
    },
    profile: {
      type: profile,
      args: {
        id: { type: UUIDType },
      },
      resolve: (_, { id }: { id: string }) =>
        prisma.profile.findUnique({
          where: {
            id,
          },
        }),
    },
  },
});

export const schema = new GraphQLSchema({ query: queryType });
