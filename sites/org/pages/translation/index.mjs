// Dependencies
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
// Hooks
import { useTranslation } from 'next-i18next'
// Components
import { PageWrapper, ns as pageNs } from 'shared/components/wrappers/page.mjs'
import { BareLayout as Layout } from 'site/components/layouts/bare.mjs'
import { TranslationStatus } from 'site/components/crowdin/status.mjs'
import { Translators } from 'site/components/crowdin/translators.mjs'
import { Popout } from 'shared/components/popout.mjs'
import { Breadcrumbs } from 'shared/components/breadcrumbs.mjs'
import { WebLink } from 'shared/components/web-link.mjs'

// Translation namespaces used on this page
const namespaces = [...new Set(pageNs), 'translation', 'locales']

const TranslationPage = ({ page }) => {
  const { t } = useTranslation(namespaces)

  const title = t('translation:translation')

  return (
    <PageWrapper {...page} layout={Layout}>
      <div className="max-w-4xl mx-auto p-4 mt-4">
        <Breadcrumbs crumbs={[{ s: 'translation', t: title }]} title={title} />

        <h1>{title}</h1>
        <p>{t('translation:proudlyMultilingual')}</p>

        <Popout tip>
          <h5>{t('translation:getInvolved')}</h5>
          <p>{t('translation:teamEffort')}</p>
          <a href="https://freesewing.dev/guides/translation" className="btn btn-accent">
            {t('translation:seeTranslationGuide')}
          </a>
        </Popout>

        <h2 id="status">Translation Status</h2>
        <TranslationStatus />
        <b className="ml-10">Legend</b>
        <ul className="list list-inside ml-4">
          <li className="flex flex-row items-center gap-2">
            <span className="inline-block w-4 h-4 rounded-full bg-primary"></span>
            <span>{t('translation:translatedAndApproved')}</span>
          </li>
          <li className="flex flex-row items-center gap-2">
            <span className="inline-block w-4 h-4 rounded-full bg-primary bg-opacity-70"></span>
            <span>{t('translation:translatedOnly')}</span>
          </li>
          <li className="flex flex-row items-center gap-2">
            <span className="inline-block w-4 h-4 rounded-full bg-primary bg-opacity-30"></span>
            <span>{t('translation:notTranslated')}</span>
          </li>
        </ul>
        <br />

        <h2 id="team">Translation Team</h2>
        <Translators />

        <h2>Supported Languages</h2>
        <p>We currently support the following five languages:</p>
        <ul className="list list-inside list-disc ml-4">
          <li>
            <b>{t('locales:en')}</b>
            <small> ({t('translation:defaultLanguage')}</small>
          </li>
          <li>
            <b>{t('locales:nl')}</b>
          </li>
          <li>
            <b>{t('locales:de')}</b>
          </li>
          <li>
            <b>{t('locales:fr')}</b>
          </li>
          <li>
            <b>{t('locales:es')}</b>
          </li>
        </ul>
        <p>
          In addition, comminity members have started initiatives to add the following langauges:
        </p>
        <ul className="list list-inside list-disc ml-4">
          <li>
            <b>{t('locales:uk')}</b>
          </li>
        </ul>
        <Popout tip>
          <h5>{t('translation:addLanguage1')}</h5>
          <p>
            {t('translation:addLanguage2')}
            <br />
            {t('translation:addLanguage3')}
          </p>
          <a href="https://freesewing.dev/guides/translation" className="btn btn-accent">
            {t('translation:seeTranslationGuide')}
          </a>
        </Popout>
      </div>
    </PageWrapper>
  )
}

export default TranslationPage

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, namespaces)),
      page: {
        locale,
        path: ['translation'],
      },
    },
  }
}
