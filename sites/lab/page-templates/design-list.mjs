// Hooks
import { useApp } from 'site/hooks/useApp.mjs'
import { useTranslation } from 'next-i18next'
// Components
import Head from 'next/head'
import Link from 'next/link'
import { PageWrapper } from 'site/components/wrappers/page.mjs'
import { BareLayout } from 'site/components/layouts/bare.mjs'
import { PageTitle } from 'shared/components/layouts/default.mjs'

const DesignLinks = ({ list, prefix = '' }) => {
  const { t } = useTranslation(['patterns'])

  return (
    <ul className="flex flex-col flex-wrap gap-2">
      {list.map((d) => (
        <li key={d} className="p-2">
          <Link
            href={`${prefix}/${d}`}
            className="capitalize text-xl p-4 font-bold text-secondary hover:text-secondary-focus hover:underline"
          >
            {t(`patterns:${d}.t`)}
            <br />
            <span className="text-lg font-normal p-4 text-base-content">
              {t(`patterns:${d}.d`)}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  )
}

export const PatternListPageTemplate = ({ section = false }) => {
  const app = useApp()
  const { t } = useTranslation(['app'])

  const title = section ? app.navigation[section].__title : t('designs')
  const fullTitle = title + ' - FreeSewing Lab'

  const sectionDesigns = (section = false) => {
    if (!section) {
      const all = []
      for (const section in app.designs) all.push(...app.designs[section])
      return all
    }

    return app.designs[section]
  }

  return (
    <PageWrapper app={app} title={`FreeSewing Lab: ${title}`} layout={BareLayout}>
      <Head>
        <title>{fullTitle}</title>
      </Head>
      <div className="max-w-7xl m-auto py-20 md:py-36 min-h-screen">
        <section className="px-8">
          <PageTitle
            app={app}
            slug={section ? app.navigation[section].__slug : '/'}
            title={title}
          />
          <DesignLinks list={sectionDesigns(section)} />
        </section>
      </div>
    </PageWrapper>
  )
}
