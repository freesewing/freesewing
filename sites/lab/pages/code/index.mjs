// Dependencies
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
// Components
import { PageWrapper, ns as pageNs } from 'shared/components/wrappers/page.mjs'
import { WebLink } from 'shared/components/link.mjs'
import { siteConfig } from 'site/site.config.mjs'
import { freeSewingConfig } from 'shared/config/freesewing.config.mjs'
import { ChoiceLink } from 'shared/components/choice-link.mjs'
import { GitHubIcon, CodeIcon } from 'shared/components/icons.mjs'

const ns = [...pageNs, 'labcode']

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
  const { t } = useTranslation(ns)

  return (
    <PageWrapper {...page}>
      <div className="max-w-prose">
        <ChoiceLink
          title={t('labcode:fscode')}
          href={freeSewingConfig.monorepo}
          icon={<GitHubIcon className="w-8 h-8" />}
        >
          <p>{t('labcode:monorepo')}:</p>
          <RepoLink href={freeSewingConfig.monorepo} />
        </ChoiceLink>
        {siteConfig.repo !== freeSewingConfig.monorepo ? (
          <ChoiceLink
            title={t('labcode:lab')}
            href={freeSewingConfig.monorepo}
            icon={<CodeIcon className="w-8 h-8" />}
          >
            <p>{t('labcode:labrepo')}:</p>
            <RepoLink href={siteConfig.repo} />
          </ChoiceLink>
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
