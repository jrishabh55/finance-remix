import { PrismaClient } from '@prisma/client';

let prisma = new PrismaClient();

const seedTransactionCategories = async () => {
  const transactionCategories = [
    'Food',
    'Rent',
    'Utilities',
    'Transport',
    'Clothes',
    'Health',
    'Education',
    'Gifts',
    'Other'
  ];

  return prisma.transactionCategory.createMany({
    data: transactionCategories.map((name) => ({ name }))
  });
};

const seedUser = async () => {
  return prisma.user.create({
    data: {
      name: 'Rishabh Jain',
      username: 'rishabh',
      email: 'rishabh@codation.io',
      passwordHash: '$2a$10$MBRO9ejazF1w3aw2Ze4h3.sE2fhAMOsU4T9sYyB4GlP4rZf19NWmO'
    }
  });
};

seedTransactionCategories();
seedUser();
