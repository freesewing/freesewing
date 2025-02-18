import { useState, useEffect } from 'react'
import { siteConfig } from 'site/site.config.mjs'
import { horFlexClasses } from 'shared/utils.mjs'
// List of authors
import { authors as allAuthors } from 'config/authors.mjs'
import { docUpdates } from 'site/prebuild/doc-updates.mjs'
// Hooks
import { useTranslation } from 'next-i18next'
import { EditIcon } from 'shared/components/icons.mjs'
import { useAccount } from 'shared/hooks/use-account.mjs'
// Components
import { PageLink } from 'shared/components/link.mjs'
import { TimeAgo, ns as timeagoNs } from 'shared/components/timeago/index.mjs'
import { BookmarkButton } from 'shared/components/bookmarks.mjs'

export const ns = ['account', timeagoNs]

const PersonList = ({ list }) =>
  list ? (
    <ul>
      {list.map((id) => (
        <li key={id}>
          {allAuthors[id] ? (
            <PageLink href={`/users/user?id=${allAuthors[id].id}`} txt={allAuthors[id].name} />
          ) : (
            <span className="font-medium">{id}</span>
          )}
        </li>
      ))}
    </ul>
  ) : null

const CreditsList = ({ updates, frontmatter, locale, t }) => (
  <ul className="list list-inside list-disc">
    {updates.a?.length > 0 ? (
      <li className="list-none">
        <b>{t('authors')}:</b>
        <PersonList list={updates.a} />
      </li>
    ) : null}

    {frontmatter.maintainers && frontmatter.maintainers.length > 0 ? (
      <li className="list-none mt-2">
        <b>{t('maintainers')}:</b>
        <PersonList list={updates.a} />
      </li>
    ) : null}
    {locale !== 'en' && (
      <li className="list-none mt-2">
        <b className="pr-2">{t('translators')}:</b>
        <a href={`https://next.freesewing.org/translation`} className="font-medium">
          {t('learnMore')}
        </a>
      </li>
    )}
    <li className="list-none mt-2">
      <b className="pr-2">{t('lastUpdated')}:</b> <TimeAgo date={updates.u} />
    </li>
  </ul>
)

export const MdxMetaData = ({ frontmatter, locale, slug }) => {
  const { control } = useAccount()
  const { t, i18n } = useTranslation('docs')

  const [localControl, setLocalControl] = useState(1)

  // Prevent hydration issues
  useEffect(() => {
    setLocalControl(control)
  }, [])

  const updates = docUpdates[slug] || {}
  frontmatter.maintainers = ['joostdecock']
  locale = i18n.language

  return (
    <div className="hidden xl:block mb-4">
      {localControl > 2 && (
        <div className="flex flex-col gap-2 max-w-xs">
          <a
            href={`https://github.dev/freesewing/freesewing/blob/develop/markdown/${siteConfig.tld}/${slug}/en.md`}
            className={`btn btn-secondary btn-outline ${horFlexClasses}`}
          >
            <EditIcon />
            <span>{t('editThisPage')}</span>
          </a>
          <BookmarkButton slug={slug} title={frontmatter.title} type="doc" />
        </div>
      )}
      <div
        className={`
          mdx mdx-toc text-base-content text-base
          sticky top-16 max-h-screen overflow-y-auto
          border-2 bg-base-200 bg-opacity-30 p-4 rounded-lg border-base-200
        `}
      >
        <h4>{t('contentsBy')}</h4>
        <CreditsList {...{ updates, frontmatter, t, locale }} />
      </div>
    </div>
  )
}
