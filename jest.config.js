/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
const config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {},
  globals: {
    'ts-jest': {
      tsconfig: {
        rootDir: './src'
      }
    }
  }  
};

module.exports = config;