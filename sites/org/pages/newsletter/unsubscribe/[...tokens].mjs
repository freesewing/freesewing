// Dependencies
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { nsMerge } from 'shared/utils.mjs'
// Hooks
import { useState, useContext } from 'react'
import { useTranslation } from 'next-i18next'
import { useBackend } from 'shared/hooks/use-backend.mjs'
// Context
import { LoadingStatusContext } from 'shared/context/loading-status-context.mjs'
// Components
import { PageWrapper, ns as pageNs } from 'shared/components/wrappers/page.mjs'
import { Popout } from 'shared/components/popout/index.mjs'
import { PageLink } from 'shared/components/link.mjs'

// Translation namespaces used on this page
const namespaces = nsMerge(pageNs, 'newsletter')

/*
 * Each page MUST be wrapped in the PageWrapper component.
 * You also MUST spread props.page into this wrapper component
 * when path and locale come from static props (as here)
 * or set them manually.
 */
const NewsletterPage = ({ page, id, ehash }) => {
  const { t } = useTranslation(namespaces)
  const { setLoadingStatus } = useContext(LoadingStatusContext)
  const backend = useBackend()

  const [confirmed, setConfirmed] = useState(false)

  const handler = async () => {
    setLoadingStatus([true, 'status:contactingBackend'])
    await backend.confirmNewsletterUnsubscribe({ id, ehash })
    setLoadingStatus([true, 'status:settingsSaved', true, true])
    setConfirmed(true)
  }

  return (
    <PageWrapper {...page} title={false}>
      <div className="max-w-xl">
        {confirmed ? (
          <>
            <h1>{t('newsletter:newsletter')}</h1>
            <p>{t('newsletter:thanksDone')}</p>
          </>
        ) : (
          <>
            <h1>
              {t('newsletter:newsletter')}: {t('newsletter:unsubscribe')}
            </h1>
            <h5>{t('newsletter:unsubscribeConfirm')}</h5>
            <p>{t('newsletter:unsubscribeLead')}</p>
            <button className="btn btn-error" onClick={handler}>
              {t('newsletter:unsubscribe')}
            </button>
            <Popout note>
              <h5>{t('newsletter:whatsWithTheClicks')}</h5>
              <p>{t('newsletter:whyLead')}</p>
              <p>
                {t('newsletter:faqLead')}:{' '}
                <PageLink
                  href="/docs/faq/newsletter/why-unsubscribe-multiple-clicks"
                  txt={t('newsletter:unsubscribeWhy')}
                />
              </p>
            </Popout>
          </>
        )}
      </div>
    </PageWrapper>
  )
}

export default NewsletterPage

export async function getStaticProps({ locale, params }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, namespaces)),
      id: params.tokens[0] || null,
      ehash: params.tokens[1] || null,
      page: {
        locale,
        path: ['newsletter'],
      },
    },
  }
}

/*
 * Do not generate anything statically
 */
export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  }
}
