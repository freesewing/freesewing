import Page from 'site/components/wrappers/page.js'
import useApp from 'site/hooks/useApp.js'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { formatVersionTitle } from 'site/components/version-picker.js'
import Layout from 'site/components/layouts/bare'
import { PageTitle } from 'shared/components/layouts/default'
import availableVersions from 'site/available-versions.json'

const DesignLinks = ({ list, prefix='', version=false }) => {
  const { t } = useTranslation(['patterns'])

  return (
    <ul className="flex flex-col flex-wrap gap-2">
      {list.map( d => (
        <li key={d} className="p-2">
          <Link href={`${prefix}/${d}`}>
            <a className="capitalize text-xl p-4 font-bold text-secondary hover:text-secondary-focus hover:underline">
              {t(`patterns:${d}.t`)}
              <br />
              <span className="text-lg font-normal p-4 text-base-content">{t(`patterns:${d}.d`)}</span>
            </a>
          </Link>
        </li>
      ))}
    </ul>
  )
}

const PatternListPageTemplate = ({ section=false, version=false }) => {
  const app = useApp()
  const { t } = useTranslation(['app'])

  const title = section
    ? app.navigation[section].__title
    : t('designs')

  const sectionDesigns = (section=false, version=false) => {
    if (!section) {
      const all = []
      if (!version || version === 'next') {
        for (const section in app.designs) all.push(...app.designs[section])
        return all
      }
      else if (availableVersions[version]) return availableVersions[version]
    } else {
      if (!version || version === 'next') return app.designs[section]
      else if (availableVersions[version]) return  availableVersions[version]
    }

    return []
  }

  return (
    <Page app={app} title={`FreeSewing Lab: ${formatVersionTitle(version)}`} layout={Layout}>
      <div className="max-w-7xl m-auto py-20 md:py-36 min-h-screen">
        <section className="px-8">
          <PageTitle app={app} slug={section ? app.navigation[section].__slug : '/' } title={title} />
            {version && version !== 'next'
              ? (
                  <ul className="flex flex-col flex-wrap gap-2">
                    {availableVersions[version].map( d => (
                      <li key={d} className="p-2">
                        <Link href={`/v/${version}/${d}`}>
                          <a className="capitalize text-xl p-4 font-bold text-secondary hover:text-secondary-focus hover:underline">
                            {t(`patterns:${d}.t`)}
                            <br />
                            <span className="text-lg font-normal p-4 text-base-content">{t(`patterns:${d}.d`)}</span>
                          </a>
                        </Link>
                      </li>
                    ))}
                  </ul>
              )
              : <DesignLinks list={sectionDesigns(section)} />
            }
        </section>
      </div>
    </Page>
  )
}

export default PatternListPageTemplate


