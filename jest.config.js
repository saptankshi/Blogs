module.exports = {
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
    testEnvironment: 'jsdom',
    moduleNameMapper: {
      '\\.css$': '<rootDir>/__mocks__/styleMock.js',
    },
      preset: './jest-preset.js',
  };
  