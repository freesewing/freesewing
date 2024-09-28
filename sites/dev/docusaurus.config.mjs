import path from 'node:path'
import { themes as prismThemes } from 'prism-react-renderer'

const config = {
  title: 'FreeSewing',
  tagline: 'An open source Javascript library for parametric sewing patterns',
  favicon: 'img/favicon.ico',

  url: 'https://freesewing.dev',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  /*
   * We need to make sure we can import from .mjs files
   */
  plugins: [
    () => ({
      name: 'mjs-loader',
      configureWebpack(config) {
        return {
          module: {
            rules: [
              {
                test: /\.mjs$/,
                include: /node_modules/,
                type: 'javascript/auto',
              },
              {
                test: /\.mjs$/,
                exclude: /node_modules/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/preset-react'],
                  },
                },
              },
            ],
          },
        }
      },
    }),
    () => ({
      name: 'fs-loader',
      configureWebpack(config) {
        const fsConfig = {
          resolve: { alias: {} },
        }
        // Load plugins from source, rather than compiled package
        for (const plugin in [
          'plugin-annotations',
          'plugin-bin-pack',
          'plugin-bust',
          'plugin-flip',
          'plugin-gore',
          'plugin-i18n',
          'plugin-measurements',
          'plugin-mirror',
          'plugin-ringsector',
          'plugin-round',
          'plugin-sprinkle',
          'plugin-svgattr',
          'plugin-theme',
          'plugin-timing',
          'plugin-versionfree-svg',
        ]) {
          fsConfig.resolve.alias[`@freesewing/${plugin}`] = path.resolve(
            `../../plugins/${plugin}/src/index.mjs`
          )
        }
        // Load these from source, rather than compiled package
        for (const pkg of ['core', 'i18n', 'models', 'snapseries']) {
          fsConfig.resolve.alias[`@freesewing/${pkg}`] = path.resolve(
            `../../packages/${pkg}/src/index.mjs`
          )
        }

        return fsConfig
      },
    }),
  ],

  i18n: { defaultLocale: 'en', locales: ['en'] },

  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.js',
          editUrl: 'https://github.com/freesewing/freesewing/tree/main/sites/dev/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      },
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'FreeSewing.dev',
      logo: {
        alt: 'FreeSewing Logo',
        src: 'img/logo-white.svg',
      },
      items: [
        { to: '/guides', label: 'Guides', position: 'left' },
        { to: '/howtos', label: 'Howtos', position: 'left' },
        { to: '/reference', label: 'Reference', position: 'left' },
        { to: '/tutorials', label: 'Tutorials', position: 'left' },
        {
          href: 'https://freesewing.org/',
          label: 'FreeSewing.org',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'light',
      links: [
        {
          title: 'Docs',
          items: [
            { label: 'Guides', to: '/guides' },
            { label: 'Howtos', to: '/howtos' },
            { label: 'Reference', to: '/reference' },
            { label: 'Tutorials', to: '/tutorials' },
          ],
        },
        {
          title: 'Help & Support',
          items: [
            {
              label: 'Discord',
              href: 'https://discord.freesewing.org/',
            },
            {
              label: 'GitHub Issues',
              href: 'https://github.com/freesewing/freesewing/issues',
            },
            {
              label: 'GitHub Discussions',
              href: 'https://github.com/freesewing/freesewing/discussions',
            },
            {
              label: 'All Support Options',
              href: 'https://freesewing.org/support',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'FreeSewing.org',
              to: 'https://freesewing.org/',
            },
            {
              label: 'Blog',
              to: 'https://freesewing.org/blog/',
            },
            {
              label: 'Showcase',
              to: 'https://freesewing.org/showccase/',
            },
            {
              label: 'Code on GitHub',
              href: 'https://github.com/freesewing/freesewing',
            },
          ],
        },
      ],
      copyright: `<a href="https://freesewing.org/">FreeSewing</a> is brought to you by <a href="https://github.com/joostdecock">Joost De Cock</a> and <a href="https://github.com/freesewing/freesewing/blob/develop/CONTRIBUTORS.md">contributors</a> with the financial support of <a href="https://freesewing.org/patrons/join">our patrons</a>`,
    },
    prism: {
      theme: prismThemes.dracula,
      darkTheme: prismThemes.dracula,
    },
  },
}

export default config
