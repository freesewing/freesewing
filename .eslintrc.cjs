module.exports = {
  extends: 'eslint:recommended',
  env: {
    browser: true,
    es2021: true,
  },
  // Required when using experimental EcmaScript features
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    // Options specific to the Babel parser
    requireConfigFile: false,
    babelOptions: {
      plugins: ['@babel/plugin-syntax-import-assertions'],
    },
  },
  rules: {},
  overrides: [
    // JavaScript source files
    {
      files: ['**/*.cjs'],
      env: {
        commonjs: true,
      },
    },

    // JSON files
    {
      files: ['*.json', '*.json5', '*.jsonc'],
      extends: ['plugin:jsonc/recommended-with-jsonc'],
      parser: 'jsonc-eslint-parser',
    },

    // YAML files
    {
      files: ['**/*.yaml', '**/*.yml'],
      plugins: ['yaml'],
      extends: ['plugin:yaml/recommended'],
    },

    // Markdown files
    {
      files: ['**/*.md'],
      plugins: ['markdown'],
      processor: 'markdown/markdown',
    },
    {
      files: ['**/*.md/*.js'],
      rules: {
        'no-console': 'off',
        'no-empty': 'off',
        'no-undef': 'off',
        'no-unused-labels': 'off',
        'no-unused-vars': 'off',
      },
    },
  ],
  globals: {
    it: 'readonly',
    describe: 'readonly',
    process: 'readonly',
    __dirname: 'readonly',
  },
}
