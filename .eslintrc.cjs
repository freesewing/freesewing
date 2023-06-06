const jsSuffixes = '{js,mjs,cjs,jsx}'

const mongoFiles = [`ansible/playbooks/files/migrate_data.${jsSuffixes}`]
const nodeFiles = [
  `**/build.dflt.${jsSuffixes}`,
  `**/build.${jsSuffixes}`,
  `**/config/**/*.${jsSuffixes}`,
  `**/*.config.${jsSuffixes}`,
  `**/prebuild.${jsSuffixes}`,
  `**/prebuild/**/*.${jsSuffixes}`,
  `**/scripts/**/*.${jsSuffixes}`,
  `packages/new-design/lib/**/*.${jsSuffixes}`,
  `sites/backend/**/*.${jsSuffixes}`,
  `sites/*/mdx/**/*.${jsSuffixes}`,
  `sites/*/themes/**/*.${jsSuffixes}`,
]
const frontendFiles = [
  `**/components/**/*.${jsSuffixes}`,
  `**/hooks/**/*.${jsSuffixes}`,
  `**/pages/**/*.${jsSuffixes}`,
  `**/page-templates/**/*.${jsSuffixes}`,
  `packages/i18n/**/*.md/*.${jsSuffixes}`,
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
      files: mongoFiles,
      plugins: ['mongo'],
      env: {
        'mongo/shell': true,
      },
    },
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
      extends: ['next'],
      settings: {
        next: {
          rootDir: 'sites/dev/',
        },
      },
    },
    {
      files: [`**/*.${jsSuffixes}{,.mustache}`],
      excludedFiles: [].concat(mongoFiles, nodeFiles, frontendFiles),
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
      files: [
        `**/tests/**/*.${jsSuffixes}`,
        `**/*.test.${jsSuffixes}`,
        'scripts/test-failure-collector.js',
      ],
      env: {
        mocha: true,
        node: true,
      },
    },

    // JSON files
    {
      files: ['**/*.{json,json5,jsonc}{,.mustache}'],
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
