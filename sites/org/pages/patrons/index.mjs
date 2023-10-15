// Dependencies
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { nsMerge } from 'shared/utils.mjs'
import patrons from 'site/prebuild/patrons.js'
// Hooks
import { useTranslation } from 'next-i18next'
import { useAccount } from 'shared/hooks/use-account.mjs'
import { useEffect, useState } from 'react'
// Components
import { PageWrapper, ns as pageNs } from 'shared/components/wrappers/page.mjs'
import { PageLink } from 'shared/components/link.mjs'

// Translation namespaces used on this page
const namespaces = nsMerge(pageNs, 'patrons')

/*
 * FIXME: This entire page needs to be adapted once we
 * migrate users from v2 to v3
 */
const Patron = ({ patron }) => (
  <div className="w-full text-center">
    <img src={patron.img} className="rounded-lg" />
    <span className="font-medium text-sm">{patron.username}</span>
  </div>
)

/*
 * Each page MUST be wrapped in the PageWrapper component.
 * You also MUST spread props.page into this wrapper component
 * when path and locale come from static props (as here)
 * or set them manually.
 */
const PatronsPage = ({ page }) => {
  const { t } = useTranslation(namespaces)
  const { account } = useAccount()
  const [patron, setPatron] = useState(false)

  useEffect(() => {
    // Do this here to avoid hydration issues
    if (account.patron && account.patron > 0) setPatron(true)
  }, [account.patron])

  return (
    <PageWrapper {...page} title={t('freeSewingPatrons')}>
      <p className="max-w-prose">
        FreeSewing is made possible by the financial support of our patrons. Together, they are a
        formidable force for good in the world, and we love them all very much.
      </p>
      {patron && (
        <p>
          To join this awesome group of people,{' '}
          <PageLink href="/patrons/join" txt="go to this page" />.
        </p>
      )}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {patrons.map((patron) => (
          <Patron key={patron.hande} patron={patron} />
        ))}
      </div>
    </PageWrapper>
  )
}

export default PatronsPage

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, namespaces)),
      page: {
        locale,
        path: ['patrons'],
      },
    },
  }
}
