import { Prisma, User } from '@prisma/client';
import { db } from '~/utils/db.server';

export type GetUsersValue = User & {
  accounts: {
    id: string;
    name: string;
  }[];
};

export type GetUsers = (arg?: Prisma.UserFindManyArgs) => Promise<GetUsersValue[]>;
export const getUsers: GetUsers = async (arg = {}) => {
  const users = await db.user.findMany({
    ...arg,
    include: {
      accounts: {
        select: {
          id: true,
          name: true
        }
      }
    }
  });

  return users;
};

export const getUsersCount = async (arg?: Prisma.UserCountArgs) => {
  const usersCount = await db.user.count(arg);
  return usersCount;
};
