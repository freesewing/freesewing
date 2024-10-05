import path from 'node:path'
import { themes as prismThemes } from 'prism-react-renderer'

const config = {
  title: 'FreeSewing',
  tagline: 'FreeSewing documentation for makers',
  favicon: 'img/favicon.ico',

  url: 'https://freesewing.org',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  /*
   * We need to make sure we can import from .mjs files
   */
  plugins: [
    () => ({
      name: 'mjs-loader',
      configureWebpack() {
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
      configureWebpack() {
        const fsConfig = {
          resolve: { alias: {} },
        }
        // Load plugins from source, rather than compiled package
        for (const plugin of [
          'core-plugins',
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
            __dirname,
            `../../plugins/${plugin}/src/index.mjs`
          )
        }
        // Load these from source, rather than compiled package
        for (const pkg of ['core', 'i18n', 'models', 'snapseries']) {
          fsConfig.resolve.alias[`@freesewing/${pkg}`] = path.resolve(
            __dirname,
            `../../packages/${pkg}/src/index.mjs`
          )
        }

        // i18n folder
        fsConfig.resolve.alias[`@i18n`] = path.resolve(__dirname, `../../i18n`)

        // Yaml loader
        fsConfig.module = {
          rules: [
            {
              test: /\.ya?ml$/,
              use: 'yaml-loader',
            },
          ],
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
          //routeBasePath: '/',
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
    image: 'img/freesewing-social-card.png',
    navbar: {
      title: 'FreeSewing',
      logo: {
        alt: 'FreeSewing Logo',
        src: 'img/logo-white.svg',
      },
      items: [
        { to: '/docs/about', label: 'About FreeSewing', position: 'left' },
        { to: '/docs/designs', label: 'FreeSewing Designs', position: 'left' },
        { to: '/docs/measurements', label: 'Measurements we use', position: 'left' },
        { to: '/docs/sewing', label: 'Sewing Terminology', position: 'left' },
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
