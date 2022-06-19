import path from 'path'
import fs from 'fs'
import { Feed } from 'feed'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeSanitize from 'rehype-sanitize'
import rehypeStringify from 'rehype-stringify'

/*
 * Helper method that creates an (empty) feed
 */
const i18n = {
  org: {
    blog: {
      en: {
        title: "Feed Title",
        description: "This is my personal feed!",
        id: "http://example.com/",
        link: "http://example.com/",
        language: "en",
        copyright: "All rights reserved 2013, John Doe",
      },
      es: {
        title: "Feed Title",
        description: "This is my personal feed!",
        id: "http://example.com/",
        link: "http://example.com/",
        language: "en",
        copyright: "All rights reserved 2013, John Doe",
      },
      nl: {
        title: "Feed Title",
        description: "This is my personal feed!",
        id: "http://example.com/",
        link: "http://example.com/",
        language: "en",
        copyright: "All rights reserved 2013, John Doe",
      },
      de: {
        title: "Feed Title",
        description: "This is my personal feed!",
        id: "http://example.com/",
        link: "http://example.com/",
        language: "en",
        copyright: "All rights reserved 2013, John Doe",
      },
      fr: {
        title: "Feed Title",
        description: "This is my personal feed!",
        id: "http://example.com/",
        link: "http://example.com/",
        language: "en",
        copyright: "All rights reserved 2013, John Doe",
      },
    },
    showcase: {
    }
  },
  dev: {
    blog: {
      en: {
        title: "Feed Title",
        description: "This is my personal feed!",
        id: "http://example.com/",
        link: "http://example.com/",
        language: "en",
        copyright: "All rights reserved 2013, John Doe",
      },
    }
  }
}

const postBody = async markdown => String(await unified()
  .use(remarkParse)
  .use(remarkRehype)
  .use(rehypeSanitize)
  .use(rehypeStringify)
  .process(markdown)
)


/* Creates a feed */
export const writeFeed = async (site, type, lang, posts) => {
  const date = new Date()
  const feed = new Feed({
    ...i18n[site][type][lang],
    id: `https://next.freesewing.${site}/${type}`, // FIXME: Remove next
    link: `https://next.freesewing.${site}/${type}`, // FIXME: Remove next
    language: lang,
    image: `https://freesewing.org/share/${lang}.wide.png`, // FIXME: Update to new location
    favicon: "https://freesewing.org/favicon.svg",
    copyright: `All rights reserved ${date.getFullYear()}, Joost De Cock & FreeSewing contributors`,
    feedLinks: {
      atom: `https://freesewing.${site}/feeds/${type}-${lang}.atom.xml`,
      json: `https://freesewing.${site}/feeds/${type}-${lang}.json`,
      rss:  `https://freesewing.${site}/feeds/${type}-${lang}.rss.xml`,
    },
    author: {
      name: "FreeSewing",
      email: "info@freesewing.org",
      link: "https://freesewing.org"
    }
  })

  for (const post of posts) {
    const url = `https://freesewing.${site}/${lang === 'en' ? '' : lang+'/'}${type}/${post.slug}`
    feed.addItem({
      title: post.title,
      id: url,
      link: url,
      description: post.title,
      content: (await postBody(post.body)),
      author: [{
        name: type === 'blog'
          ? post.author.displayname
          : post.maker.displayname
      }],
      date: new Date(post.date),
      image: `https://posts.freesewing.org/${post.image.url}`
    })
  }

  const files = {}
  files[`${type}-${lang}.atom.xml`] = feed.atom1()
  files[`${type}-${lang}.json`] = feed.json1()
  files[`${type}-${lang}.rss.xml`] = feed.rss2()

  // Write to disc, one file per per format
  for (const [file, content] of Object.entries(files)) {
    console.log(`Writing feed: ${file}`)
    fs.writeFileSync(
      path.resolve('..', site, 'public', 'feeds', file),
      content
    )
  }
}

