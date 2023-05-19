// Components that are available in MDX content
import { components as baseComponents } from 'shared/components/mdx/index.mjs'
// List of authors
import { authors as allAuthors } from 'config/authors.mjs'
import { docUpdates } from 'site/prebuild/doc-updates.mjs'
// Components
import { PageLink } from 'shared/components/page-link.mjs'
import { DateTime, Interval } from 'luxon'
// Context
import { useContext } from 'react'
import { NavigationContext } from 'shared/context/navigation-context.mjs'
// Hooks
import { useTranslation } from 'next-i18next'

// Previous-Next navigation
//import { PrevNext } from '../mdx/prev-next.mjs'
//
//
const TimeAgo = ({ date, t }) => {
  const i = Interval.fromDateTimes(DateTime.fromISO(date), DateTime.now())
    .toDuration(['hours', 'days', 'months', 'years'])
    .toObject()
  let ago = ''
  if (i.years < 1 && i.months < 1) {
    if (Math.floor(i.days) === 1) ago += `${t('oneDay')}`
    else if (Math.floor(i.days) === 0) ago += `${t('lessThanADay')}`
  } else {
    if (i.years === 1) ago += `${i.years} ${t('year')}, `
    else if (i.years > 1) ago += `${i.years} ${t('years')}, `
    if (i.months === 1) ago += `${i.months} ${t('month')}`
    else if (i.months > 1) ago += `${i.months} ${t('months')}`
  }

  return `${ago} ${t('ago')}`
}

const PersonList = ({ list }) =>
  list.map((id, i) => (
    <li key={id} className="list-none">
      {allAuthors[id] ? (
        <PageLink href={`/users/${allAuthors[id].id}`} txt={allAuthors[id].name} />
      ) : (
        <span className="font-medium">{id}</span>
      )}
      {i !== list.length - 1 ? ',' : <span className="pl-2 pr-1 font-bold">|</span>}
    </li>
  ))
const Ul = ({ children }) => (
  <ul key="authors" className="flex flex-row flex-wrap gap-1 -ml-3">
    {children}
  </ul>
)

const MetaData = ({ authors = [], maintainers = [], updated = '20220825', locale, slug, t }) => (
  <div className="py-4 px-4 rounded-lg bg-secondary bg-opacity-10 shadow mb-4">
    {locale === 'en' ? (
      <div className="flex flex-row items-center gap-4 justify-between text-base-content mb-2">
        <span className="font-medium text-lg">{t('helpImproveDocs')}</span>
        <a
          href={`https://github.dev/freesewing/freesewing/blob/develop/markdown/org/${slug}/en.md`}
          className="btn btn-secondary btn-sm flex flex-row gap-2 items-center"
        >
          <span role="img">✏️</span>
          <span className="text-secondary-content">{t('editThisPage')}</span>
        </a>
      </div>
    ) : (
      <div className="flex flex-row items-center gap-4 justify-between text-base-content mb-2">
        <span className="font-medium text-lg">{t('helpTranslateDocs')}</span>
        <a
          href={`https://freesewing.dev/guides/translation`}
          className="btn btn-secondary btn-sm flex flex-row gap-2 items-center"
        >
          <span role="img">💡</span>
          <span className="text-secondary-content">{t('learnMore')}</span>
        </a>
      </div>
    )}
    <div className="p-2 text-sm">
      <Ul>
        {authors.length > 0 ? (
          <>
            <li className="list-none font-medium opacity-70 italic">{t('authors')}:</li>
            <PersonList list={authors} slug={slug} />
          </>
        ) : null}

        {maintainers.length > 0 ? (
          <>
            <li className="list-none font-medium opacity-70 italic">{t('maintainers')}:</li>
            <PersonList list={authors} />
          </>
        ) : null}

        <li className="list-none font-medium opacity-70 italic">{t('lastUpdated')}:</li>
        <li className="list-none font-medium">
          <TimeAgo date={updated} t={t} />
        </li>
      </Ul>
    </div>
  </div>
)

export const MdxWrapper = ({ MDX, frontmatter = {}, components = {} }) => {
  const { t } = useTranslation('docs')
  const allComponents = { ...baseComponents, ...components }
  const { locale, slug } = useContext(NavigationContext)

  const updates = docUpdates[slug] || {}

  return (
    <div className="text-primary mdx max-w-prose text-base-content max-w-prose text-base">
      <MetaData
        maintainers={frontmatter?.maintainers || []}
        authors={updates.authors || []}
        lastUpdated={updates.lastUpdates}
        {...{ locale, slug, t }}
      />
      <MDX components={allComponents} />
    </div>
  )
}
