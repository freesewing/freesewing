// Dependencies
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
// Hooks
import { useTranslation } from 'next-i18next'
// Components
import { PageWrapper, ns as pageNs } from 'shared/components/wrappers/page.mjs'
import { TranslationStatus } from 'site/components/crowdin/status.mjs'
import { Translators } from 'site/components/crowdin/translators.mjs'
import { Popout } from 'shared/components/popout/index.mjs'
import Link from 'next/link'

// Translation namespaces used on this page
const namespaces = [...new Set(pageNs), 'translation', 'locales']

const TranslationPage = ({ page }) => {
  const { t } = useTranslation(namespaces)

  const title = t('translation:translation')

  return (
    <PageWrapper {...page} title={title}>
      <div className="max-w-2xl">
        <p>{t('translation:proudlyMultilingual')}</p>

        <div className="max-w-2xl">
          <Popout tip>
            <h5>{t('translation:getInvolved')}</h5>
            <p>{t('translation:teamEffort')}</p>
            <p>
              <Link href="/translation/join" className="btn btn-accent mr-2">
                {t('translation:joinTheTeam')}
              </Link>
            </p>
            <p>
              <a
                href="https://freesewing.dev/guides/translation"
                className="btn btn-accent btn-outline"
              >
                {t('translation:seeTranslationGuide')}
              </a>
            </p>
          </Popout>
        </div>

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
        <div className="max-w-3xl">
          <Popout tip>
            <h5>{t('translation:addLanguage1')}</h5>
            <p>
              {t('translation:addLanguage2')}
              <br />
              {t('translation:addLanguage3')}
            </p>
            <p>
              <Link href="/translation/suggest-language" className="btn btn-accent mr-2">
                {t('translation:suggestLanguage')}
              </Link>
            </p>
            <p>
              <a
                href="https://freesewing.dev/guides/translation"
                className="btn btn-accent btn-outline"
              >
                {t('translation:seeTranslationGuide')}
              </a>
            </p>
          </Popout>
        </div>
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
