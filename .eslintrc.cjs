const nodeFiles = [
  '**/build.dflt.{js,mjs,cjs}',
  '**/build.{js,mjs,cjs}',
  '**/config/**',
  '**/prebuild.{js,mjs,cjs}',
  '**/prebuild/**',
  '**/scripts/**',
  'packages/new-design/lib/**',
  'sites/backend/**',
  'sites/*/mdx/**',
  'sites/*/themes/**',
]
const frontendFiles = [
  '**/components/**',
  '**/hooks/**',
  '**/pages/**',
  '**/page-templates/**',
  'packages/i18n/**/*.md/*.js',
]

module.exports = {
  extends: 'eslint:recommended',
  env: {
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
    // Partitioned JavaScript files
    {
      files: nodeFiles,
      env: {
        node: true,
      },
      rules: {
        'no-console': 'off',
      },
    },
    {
      files: frontendFiles,
      excludedFiles: nodeFiles,
      extends: ['next/core-web-vitals'],
      env: {
        // We can be stricter than 'next/core-web-vitals' is
        node: false,
      },
    },
    {
      files: ['**'],
      excludedFiles: [].concat(nodeFiles, frontendFiles),
      env: {
        'shared-node-browser': true,
      },
    },
    // Additional globals for JavaScript files that happen to be CommonJS.
    // Only allowed in *.cjs files, not *.js files, because we probably want to move towards
    // a `"type": "module"` future where any CommonJS files would have to have .cjs extensions.
    {
      files: ['**/*.cjs'],
      env: {
        commonjs: true,
      },
    },
    // Additional globals for JavaScript files that happen to contain Mocha tests
    {
      files: ['**/tests/**', '**/*.test.mjs'],
      env: {
        mocha: true,
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
      files: ['**/markdown/**', '**/*.md'],
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
}
