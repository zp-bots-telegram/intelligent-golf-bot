module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:prettier/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript'
  ],
  env: {
    jest: true
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/prefer-interface': 'off',
    '@typescript-eslint/no-non-null-assertion': 'error',
    '@typescript-eslint/no-empty-function': [1, { allow: ['arrowFunctions'] }],
    'jest/no-standalone-expect': [
      'error',
      { additionalTestBlockFunctions: ['each.test', 'each.it'] }
    ],
    'linebreak-style': ['error', 'unix'],
    'import/no-default-export': 'error',
    'import/prefer-default-export': 'off',
    'max-classes-per-file': 'off',
    'jest/no-mocks-import': 'off',
    'jest/expect-expect': 'error',
    'import/extensions': [0],
    'no-restricted-imports': ['error', { patterns: ['../*', './*'] }],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '**/*.test.*',
          '**/__tests__/**/*.*',
          '**/__mocks__/**/*.*',
          '**/testing/**/*.*',
          '**/*.js',
          '.*.js'
        ]
      }
    ],
    'spaced-comment': ['error', 'always', { markers: ['/'] }]
  },
  overrides: [
    {
      files: ['*.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
        'no-console': 'off'
      }
    },
    {
      ...require('eslint-plugin-jest').configs.recommended,
      files: ['src/**/*.test.{js,ts}', '__tests__/**/*.{js,ts}'],
      plugins: ['jest'],
      rules: {}
    }
  ],

  settings: {
    'import/resolver': {
      typescript: {} // this loads <rootdir>/tsconfig.json to eslint
    }
  }
};
