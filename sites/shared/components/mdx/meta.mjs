import { siteConfig } from 'site/site.config.mjs'
// List of authors
import { authors as allAuthors } from 'config/authors.mjs'
import { docUpdates } from 'site/prebuild/doc-updates.mjs'
// Components
import { PageLink } from 'shared/components/link.mjs'
import { TimeAgo } from 'shared/components/timeago/index.mjs'
// Hooks
import { useTranslation } from 'next-i18next'
import { EditIcon } from 'shared/components/icons.mjs'

const PersonList = ({ list }) =>
  list ? (
    <ul>
      {list.map((id) => (
        <li key={id}>
          {allAuthors[id] ? (
            <PageLink href={`/users/${allAuthors[id].id}`} txt={allAuthors[id].name} />
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
  const { t } = useTranslation('docs')

  const updates = docUpdates[slug] || {}
  frontmatter.maintainers = ['joostdecock']
  locale = 'fr'

  /*
   * FIXME
   *
   * The link to the translator status pages on this page links to
   * next.freesewing.org because this content is not available on the current
   * freesewing.org.
   */

  return (
    <div className="hidden xl:block mb-4">
      <a
        href={`https://github.dev/freesewing/freesewing/blob/develop/markdown/${siteConfig.tld}/${slug}/en.md`}
        className="btn btn-success flex flex-row justify-between items-center w-full px-4 bg-gradient-to-r from-primary to-accent mb-4 hover:from-accent hover:to-accent"
      >
        <EditIcon />
        <span>{t('editThisPage')}</span>
      </a>
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
