import path from 'node:path'
import { themes as prismThemes } from 'prism-react-renderer'
import designs from '../../config/software/designs.json'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

/*
 * We customize the sidebar somewhat:
 *  - We bundle the options as one page, so keep them out the sidebar
 *  - We hide certain dynamic pages (like for measurements sets, patterns, and so on)
 */
function customizeSidebar(items) {
  // Filter out design options
  const docs = items.filter((entry) => entry.label === 'Docs').pop().items
  for (const item in docs) {
    if (docs[item].label === 'FreeSewing Designs') {
      for (const design in docs[item].items) {
        for (const subpage in docs[item].items[design].items) {
          if (docs[item].items[design].items[subpage].label === 'Design Options') {
            docs[item].items[design].items[subpage].items = []
          }
        }
      }
    }
  }

  return items
}

const config = {
  title: 'FreeSewing',
  tagline: 'FreeSewing documentation for makers',
  favicon: 'img/favicon.ico',

  url: 'https://freesewing.org',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  future: {
    experimental_faster: false, // Too many bugs for now
  },

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

        // Load designs from source, rather than compiled package
        for (const pkg of Object.keys(designs)) {
          fsConfig.resolve.alias[`@freesewing/${pkg}`] = path.resolve(
            __dirname,
            `../../designs/${pkg}/src/index.mjs`
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
    [
      '@docusaurus/plugin-content-blog',
      {
        id: 'showcase',
        routeBasePath: 'showcase',
        path: './showcase',
        authorsMapPath: '../authors.json',
        postsPerPage: 50,
        blogSidebarCount: 10,
        blogSidebarTitle: 'Recent Showcases',
      },
    ],
    [
      '@docusaurus/plugin-content-blog',
      {
        id: 'newsletter',
        routeBasePath: 'newsletter',
        path: './newsletter',
        authorsMapPath: '../authors.json',
        blogTitle: 'FreeSewing Newsletter',
        blogDescription: 'Four times per year, honest wholesome content, no ads, no nonsense',
        blogSidebarCount: 50,
        blogSidebarTitle: 'Newsletter Editions',
        postsPerPage: 10,
        feedOptions: {
          type: 'rss',
          title: 'FreeSewing Newsletter Editions',
          description: 'A feed for the FreeSewing newsletter',
          copyright: 'FreeSewing',
          language: 'en',
          createFeedItems: async (params) => {
            const { blogPosts, defaultCreateFeedItems, ...rest } = params
            return defaultCreateFeedItems({
              blogPosts: blogPosts.filter((item, index) => index < 10),
              ...rest,
            })
          },
        },
      },
    ],
    async function myPlugin() {
      return {
        name: 'docusaurus-tailwindcss',
        configurePostCss(postcssOptions) {
          // Appends TailwindCSS and AutoPrefixer.
          postcssOptions.plugins.push(tailwindcss)
          postcssOptions.plugins.push(autoprefixer)
          return postcssOptions
        },
      }
    },
  ],

  i18n: { defaultLocale: 'en', locales: ['en'] },

  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/', //'/docs',
          sidebarPath: './sidebars.js',
          editUrl: 'https://github.com/freesewing/freesewing/tree/v4/sites/org/',
          async sidebarItemsGenerator({ defaultSidebarItemsGenerator, ...args }) {
            const sidebarItems = await defaultSidebarItemsGenerator(args)
            return customizeSidebar(sidebarItems)
          },
        },
        theme: {
          customCss: './src/css/custom.css',
        },
        blog: {
          path: 'blog',
          // Simple use-case: string editUrl
          editUrl: 'https://github.com/freesewing/freesewing/site/orgdocs/',
          editLocalizedFiles: false,
          blogTitle: 'FreeSewing Blog',
          blogDescription: 'News and updates from the people behind FreeSewing',
          blogSidebarCount: 5,
          blogSidebarTitle: 'Recent blog posts',
          routeBasePath: 'blog',
          authorsMapPath: '../authors.json',
          include: ['*/index.mdx'],
          exclude: [
            '**/_*.{js,jsx,ts,tsx,md,mdx}',
            '**/_*/**',
            '**/*.test.{js,jsx,ts,tsx}',
            '**/__tests__/**',
          ],
          postsPerPage: 10,
          blogListComponent: '@theme/BlogListPage',
          //blogPostComponent: '@site/src/components/blog/post.mjs',
          blogTagsListComponent: '@theme/BlogTagsListPage',
          blogTagsPostsComponent: '@theme/BlogTagsPostsPage',
          //remarkPlugins: [require('./my-remark-plugin')],
          //rehypePlugins: [],
          //beforeDefaultRemarkPlugins: [],
          //beforeDefaultRehypePlugins: [],
          truncateMarker: /<!--\s*(truncate)\s*-->/,
          showReadingTime: true,
          feedOptions: {
            type: 'rss',
            title: 'FreeSewing Blog Posts',
            description: 'News and updates from the people behind FreeSewing',
            copyright: 'FreeSewing',
            language: 'en',
            createFeedItems: async (params) => {
              const { blogPosts, defaultCreateFeedItems, ...rest } = params
              return defaultCreateFeedItems({
                // keep only the 10 most recent blog posts in the feed
                blogPosts: blogPosts.filter((item, index) => index < 10),
                ...rest,
              })
            },
          },
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
        src: 'img/logo.svg',
      },
      items: [
        { to: '/designs/', label: '👕 Designs', position: 'left' },
        { to: '/docs/', label: '📖 Docs', position: 'left' },
        { to: '/showcase/', label: '📷 Showcase', position: 'left' },
        { to: '/blog/', label: '📰 Blog', position: 'left' },
        { to: '/new/', label: '➕ New...', position: 'right' },
        { to: '/account/', label: '🔒 Account', position: 'right' },
      ],
    },
    footer: {
      style: 'light',
      links: [
        {
          title: 'Sections',
          items: [
            { label: 'FreeSewing Designs', to: '/designs/' },
            { label: 'FreeSewing Showcase', to: '/showcase/' },
            { label: 'FreeSewing Blog', to: '/blog/' },
            { label: 'FreeSewing Editor', to: '/editor/' },
          ],
        },
        {
          title: 'Help & Support',
          items: [
            { label: 'About FreeSewing', to: '/docs/about/' },
            { label: 'Getting Started', to: '/docs/about/guide/' },
            { label: 'Frequently Asked Questions', href: '/docs/about/faq/' },
            { label: 'Need Help?', href: '/support' },
          ],
        },
        {
          title: 'More',
          items: [
            { label: 'FreeSewing.dev', to: 'https://freesewing.dev/' },
            { label: 'FreeSewing.social', to: 'https://freesewing.social/' },
            { label: 'Code on GitHub', to: 'https://github.com/freesewing/freesewing' },
            { label: 'FreeSewing Revenue Pledge 💜', href: '/docs/about/pledge/' },
          ],
        },
      ],
      copyright: `<a href="https://freesewing.org/">FreeSewing</a> is brought to you by <a href="https://github.com/joostdecock">Joost De Cock</a> and <a href="https://github.com/freesewing/freesewing/blob/develop/CONTRIBUTORS.md">contributors</a> with the financial support of <a href="/patrons/join">our patrons</a>`,
    },
    prism: {
      theme: prismThemes.dracula,
      darkTheme: prismThemes.dracula,
    },
  },
}

export default config
