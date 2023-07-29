// Dependencies
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { nsMerge } from 'shared/utils.mjs'
// Hooks
import { useState, useEffect } from 'react'
import { useTranslation } from 'next-i18next'
import { useAccount } from 'shared/hooks/use-account.mjs'
// Components
import Head from 'next/head'
import { PageWrapper, ns as pageNs } from 'shared/components/wrappers/page.mjs'
//import { PageLink } from 'shared/components/page-link.mjs'
import { BareLayout } from 'site/components/layouts/bare.mjs'
import { ForceAccountCheck } from 'shared/components/account/force-account-check.mjs'
import { DownIcon } from 'shared/components/icons.mjs'
import { FreeSewingAnimation } from 'shared/components/animations/freesewing.mjs'
import { HowDoesItWorkAnimation } from 'shared/components/animations/how-does-it-work.mjs'

const ns = nsMerge(pageNs, 'common', 'homepage')

//const BoldLink = ({ href, children }) => (
//  <a href={href} className="font-bold underline hover:decoration-4">
//    {children}
//  </a>
//)

/*
 * Each page MUST be wrapped in the PageWrapper component.
 * You also MUST spread props.page into this wrapper component
 * when path and locale come from static props (as here)
 * or set them manually.
 */
const HomePage = ({ page }) => {
  const [ready, setReady] = useState(false)
  const { t } = useTranslation(ns)
  const { account } = useAccount()

  // Duration of the FreeSewing animation
  const duration = 6.66

  useEffect(() => {
    setTimeout(() => setReady(true), duration * 1000)
  }, [])

  return (
    <PageWrapper {...page} layout={BareLayout}>
      <ForceAccountCheck />
      <Head>
        <title>FreeSewing.org</title>
      </Head>
      <div
        className={`m-0 p-0 w-full transition-all duration-300 ${
          ready ? '-translate-y-full h-1 opacity-0' : 'h-screen'
        } ${account.username ? 'hidden' : ''}`}
      >
        <div className="flex flex-col items-center justify-between h-screen mt-4 lg:mt-12 max-w-md m-auto pb-32">
          <span />
          <FreeSewingAnimation duration={duration} />
          <DownIcon className="w-12 h-12 animate-bounce" />
        </div>
      </div>

      <div className="max-w-7xl m-auto px-0 my-24">
        <div className="flex flex-col gap-8 md:grid md:grid-cols-2 md:gap-4 mt-12 md:px-4">
          <div className="p-1 bg-gradient-to-tr from-accent to-primary rounded-none md:rounded-xl md:shadow -mx-2 px-2 md:mx-auto md:px-1 flex flex-col">
            <div className="bg-base-100 px-4 md:px-8 py-10 rounded-none md:rounded-lg grow">
              <h2 className="mb-4">{t('whatIsFreeSewing')}</h2>
              <p className="font-medium">{t('homepage:what1')}</p>
              <p className="font-medium">{t('homepage:what2')}</p>
              <p className="font-medium">{t('homepage:what3')}</p>
            </div>
          </div>

          <div className="p-1 bg-gradient-to-tr from-info to-neutral rounded-none md:rounded-xl md:shadow -mx-2 px-2 md:mx-auto md:px-1 flex flex-col">
            <div className="bg-base-100 px-4 md:px-8 py-10 rounded-none md:rounded-lg grow">
              <h2 className="mb-4">{t('whatIsFreeSewingNot')}</h2>
              <p className="font-medium">{t('homepage:whatNot1')}</p>
              <p className="font-medium">{t('homepage:whatNot2')}</p>
              <p className="font-medium">{t('homepage:whatNot3')}</p>
              <p className="font-medium">
                {t('homepage:whatNot4')}
                <br />
                {t('homepage:whatNot5')}
              </p>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <h2 className="text-5xl">{t('howDoesItWork')}</h2>
          <HowDoesItWorkAnimation t={t} />
        </div>
      </div>
    </PageWrapper>
  )
}

export default HomePage

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ns)),
      page: {
        locale,
        path: [],
      },
    },
  }
}
