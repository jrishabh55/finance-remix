import { Prisma, User } from '@prisma/client';
import { db } from '~/utils/db.server';

export type GetUsersValue = User & {
  accounts: {
    id: string;
    name: string;
  }[];
};

export type GetUsers = (args?: Prisma.UserAggregateArgs) => Promise<GetUsersValue[]>;

export const getUsers: GetUsers = async (arg: Prisma.UserAggregateArgs = {}) => {
  const Users = await db.user.findMany({
    ...(arg as any),
    include: {
      accounts: {
        select: {
          id: true,
          name: true
        }
      }
    }
  });

  return (Users as GetUsersValue[]) || [];
};

export const getUsersCount = async (where?: Prisma.UserAggregateArgs['where']) => {
  const UsersCount = await db.user.count({
    where
  });

  return UsersCount || 0;
};
