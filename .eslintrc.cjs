module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    createDefaultProgram: true,
    impliedStrict: true
  },
  plugins: ['@typescript-eslint', 'import'],
  env: {
    es6: true,
    node: true
  },
  extends: ['airbnb-typescript/base', 'prettier'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  rules: {
    "no-unused-vars": "off",
    'arrow-parens': 'off',
    '@typescript-eslint/quotes': [
      'error',
      'single',
      {
        avoidEscape: true,
        allowTemplateLiterals: true
      }
    ],
    'sort-imports': [
      'error',
      {
        ignoreCase: false,
        ignoreDeclarationSort: true,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single']
      }
    ],
    'max-lines': [
      'error',
      {
        max: 500,
        skipBlankLines: false,
        skipComments: false
      }
    ],
    'max-len': [
      1,
      150,
      2,
      {
        ignorePattern: '^import\\s.+\\sfrom\\s.+;$',
        ignoreUrls: true
      }
    ],
    'lines-between-class-members': 'off',
    '@typescript-eslint/lines-between-class-members': [
      'error',
      'always',
      {
        exceptAfterOverload: true,
        exceptAfterSingleLine: true
      }
    ],
    'global-require': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    'import/prefer-default-export': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-unused-expressions': [
      'error',
      { allowShortCircuit: true }
    ],
    '@typescript-eslint/no-unused-vars-experimental': 'off',
    'prefer-destructuring': 'off',
    'class-methods-use-this': 'off',
    'no-underscore-dangle': ['error', { allow: ['_id'] }],
    'no-extend-native': 'off',
    'object-curly-newline': 'off',
    'no-param-reassign': 'off',
    'no-restricted-syntax': 'off',
    'no-continue': 'off',
    'implicit-arrow-linebreak': 'off',
    'function-paren-newline': 'off',
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    '@typescript-eslint/keyword-spacing': 'off',
    '@typescript-eslint/comma-dangle': ['error', 'never'],
    'func-names': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: false,
        optionalDependencies: false,
        peerDependencies: false
      }
    ]
  }
};
