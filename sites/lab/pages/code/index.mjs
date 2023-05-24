// Dependencies
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import Head from 'next/head'
// Components
import { PageWrapper, ns as pageNs } from 'shared/components/wrappers/page.mjs'
import { Popout } from 'shared/components/popout.mjs'
import { WebLink } from 'shared/components/web-link.mjs'
import { siteConfig } from 'site/site.config.mjs'
import { freeSewingConfig } from 'shared/config/freesewing.config.mjs'

const ns = [...pageNs, 'labdocs']

const RepoLink = ({ href = false }) =>
  href ? (
    <ul className="list list-inside">
      <li className="list list-disc pl-2">
        <WebLink href={href} txt={href.split('://').pop()} />
      </li>
    </ul>
  ) : null

/*
 * Each page MUST be wrapped in the PageWrapper component.
 * You also MUST spread props.page into this wrapper component
 * when path and locale come from static props (as here)
 * or set them manually.
 */
const DocsPage = ({ page }) => {
  const { t, i18n } = useTranslation(ns)

  return (
    <PageWrapper {...page}>
      <div className="max-w-prose">
        <p>All of the FreeSewing source code is available in our monorepo:</p>
        <RepoLink href={freeSewingConfig.monorepo} />
        {siteConfig.repo !== freeSewingConfig.monorepo ? (
          <>
            <p>In addition, this particular lab instance has additional source code hosted at:</p>
            <RepoLink href={siteConfig.repo} />
          </>
        ) : null}
      </div>
    </PageWrapper>
  )
}

export default DocsPage

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ns)),
      page: {
        locale,
        path: ['code'],
      },
    },
  }
}
