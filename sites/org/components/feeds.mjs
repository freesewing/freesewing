import Head from 'next/head'
import { useLanguage } from 'shared/hooks/use-language.mjs'

const rss = (lang, type, title) => ({
  title,
  type: 'application/rss+xml',
  href: `/feeds/${type}-${lang}.rss.xml`,
})
const atom = (lang, type, title) => ({
  title,
  type: 'application/rss+atom',
  href: `/feeds/${type}-${lang}.atom.xml`,
})
const json = (lang, type, title) => ({
  title,
  type: 'application/json',
  href: `/feeds/${type}-${lang}.json`,
})

const feeds = {
  en: [
    atom('en', 'blog', 'Atom feed of FreeSewing.org blog posts'),
    json('en', 'blog', 'JSON feed of FreeSewing.org blog posts'),
    rss('en', 'blog', 'RSS feed of FreeSewing.org blog posts'),
    atom('en', 'showcase', 'Atom feed of FreeSewing.org showcase posts'),
    json('en', 'showcase', 'JSON feed of FreeSewing.org showcase posts'),
    rss('en', 'showcase', 'RSS feed of FreeSewing.org showcase posts'),
  ],
  de: [
    atom('de', 'blog', 'Atom-Feed von FreeSewing.org-Blogbeiträgen'),
    json('de', 'blog', 'JSON-Feed von FreeSewing.org-Blogbeiträgen'),
    rss('de', 'blog', 'RSS-Feed von FreeSewing.org-Blogbeiträgen'),
    atom('de', 'showcase', 'Atom-Feed von FreeSewing.org-Galeriebeiträgen'),
    json('de', 'showcase', 'JSON-Feed von FreeSewing.org-Galeriebeiträgen'),
    rss('de', 'showcase', 'RSS-Feed von FreeSewing.org-Galeriebeiträgen'),
  ],
  es: [
    atom('es', 'blog', 'Fuente Atom de las publicaciones del blog FreeSewing.org'),
    json('es', 'blog', 'Fuente JSON de las publicaciones del blog FreeSewing.org'),
    rss('es', 'blog', 'Fuente RSS de las publicaciones del blog FreeSewing.org'),
    atom('es', 'showcase', 'Fuente Atom de publicaciones de exhibición de FreeSewing.org'),
    json('es', 'showcase', 'Fuente JSON de publicaciones de exhibición de FreeSewing.org'),
    rss('es', 'showcase', 'Fuente RSS de publicaciones de exhibición de FreeSewing.org'),
  ],
  fr: [
    atom('fr', 'blog', 'Flux Atom des articles du blog FreeSewing.org'),
    json('fr', 'blog', 'Flux JSON des articles du blog FreeSewing.org'),
    rss('fr', 'blog', 'Flux RSS des articles du blog FreeSewing.org'),
    atom('fr', 'showcase', 'Flux Atom des articles du galerie FreeSewing.org'),
    json('fr', 'showcase', 'Flux JSON des articles du galerie FreeSewing.org'),
    rss('fr', 'showcase', 'Flux RSS des articles du galerie FreeSewing.org'),
  ],
  nl: [
    atom('nl', 'blog', 'Atom feed van FreeSewing.org blog posts'),
    json('nl', 'blog', 'JSON feed van FreeSewing.org blog posts'),
    rss('nl', 'blog', 'RSS feed van FreeSewing.org blog posts'),
    atom('nl', 'showcase', 'Atom feed van FreeSewing.org voorbeelden'),
    json('nl', 'showcase', 'JSON feed van FreeSewing.org voorbeelden'),
    rss('nl', 'showcase', 'RSS feed van FreeSewing.org voorbeelden'),
  ],
}

export const Feeds = () => {
  const language = useLanguage()

  return language ? (
    <Head>
      {feeds[language].map((feed) => (
        <link key={feed.href} {...feed} />
      ))}
    </Head>
  ) : null
}
