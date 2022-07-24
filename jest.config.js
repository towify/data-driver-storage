module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  roots: ['./app'],
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest'
  },
  transformIgnorePatterns: [
    '/node_modules/(?!soid-data|towify-scf-client-engine|towify-scf-values|@towify/ui-util|@towify/common-values|live-data-type/)'
  ],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  globals: {
    'ts-jest': {
      tsconfig: {
        allowJs: true
      }
    }
  }
};
