/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  roots: ['<rootDir>'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleDirectories: ['node_modules', 'app'],
  moduleNameMapper: {
    '~/(.*)': '<rootDir>/app/$1'
  }
};
