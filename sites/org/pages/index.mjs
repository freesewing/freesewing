// Dependencies
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { nsMerge } from 'shared/utils.mjs'
// Hooks
import { useTranslation } from 'next-i18next'
import { useAccount } from 'shared/hooks/use-account.mjs'
import { useEffect, useState } from 'react'
// Components
import Head from 'next/head'
import { PageWrapper, ns as pageNs } from 'shared/components/wrappers/page.mjs'
import { BareLayout } from 'site/components/layouts/bare.mjs'
import { ForceAccountCheck } from 'shared/components/account/force-account-check.mjs'
import {
  OkIcon,
  NoIcon,
  DesignIcon,
  ShowcaseIcon,
  DocsIcon,
  HelpIcon,
  ChatIcon,
} from 'shared/components/icons.mjs'
import { HowDoesItWorkAnimation } from 'shared/components/animations/how-does-it-work.mjs'
import { SignUp, ns as susiNs } from 'shared/components/susi/sign-up.mjs'
import { PleaseSubscribe, ns as subNs } from 'shared/components/patrons/please-subscribe.mjs'
import { CardLink } from 'shared/components/link.mjs'

const ns = nsMerge(pageNs, subNs, susiNs, 'homepage')

const Card = ({ bg = 'bg-base-200', textColor = 'text-base-content', title, children, icon }) => (
  <div className={`px-8 ${bg} py-10 rounded-lg block ${textColor} shadow-lg grow`}>
    <h2 className="mb-4 text-inherit flex flex-row gap-4 justify-between items-center font-medium">
      {title}
      {icon}
    </h2>
    {children}
  </div>
)

/*
 * Each page MUST be wrapped in the PageWrapper component.
 * You also MUST spread props.page into this wrapper component
 * when path and locale come from static props (as here)
 * or set them manually.
 */
const HomePage = ({ page }) => {
  const { t } = useTranslation(ns)
  const { account } = useAccount()
  const [user, setUser] = useState(false)

  useEffect(() => {
    // Do this here to avoid hydration issues
    if (account.username) setUser(account.username)
  }, [account.username])

  return (
    <PageWrapper {...page} layout={BareLayout}>
      <ForceAccountCheck />
      <Head>
        <title>FreeSewing.org</title>
      </Head>

      <div className="max-w-7xl m-auto px-0 -mt-12 mb-24 md:my-24">
        <div className="text-center mt-20 md:mt-20">
          <HowDoesItWorkAnimation t={t} />
        </div>

        <div className="flex flex-col gap-8 md:grid md:grid-cols-2 md:gap-4 mt-12 md:mt-20 md:px-4">
          <Card
            title={t('whatIsFreeSewing')}
            icon={<OkIcon className="w-12 h-12 text-success" stroke={4} />}
          >
            <p className="font-medium text-lg">{t('homepage:what1')}</p>
            <p className="font-medium text-lg">{t('homepage:what3')}</p>
          </Card>
          <Card
            title={t('whatIsFreeSewingNot')}
            icon={<NoIcon className="w-12 h-12 text-error" stroke={3} />}
          >
            <p className="font-medium text-lg">{t('homepage:whatNot1')}</p>
            <p className="font-medium text-lg">{t('homepage:whatNot2')}</p>
          </Card>
        </div>

        {!user && (
          <div className="p-1 bg-primary bg-opacity-10 mt-12 rounded-none md:rounded-lg lg:rounded-xl md:shadow-lg md:mx-4 p-8 lg:px-12 md:py-0">
            <div className="flex flex-col md:gap-8 lg:gap-12 md:flex md:flex-row m-auto">
              <div className="-mx-4 md:mx-0 md:pt-8 pb-8 lg:py-12 grow m-auto max-w-prose">
                <SignUp />
              </div>
              <div className="-mx-4 md:mx-0 md:mt-0 pt-0 md:pt-8 pb-8 lg:py-12 max-w-prose m-auto m-auto">
                <h2 className="text-inherit mb-4 hidden md:block">{t('homepage:whyBother')}</h2>
                <ul>
                  {[1, 2, 3, 4].map((i) => (
                    <li className="flex flex-row gap-2 my-2" key={i}>
                      <OkIcon stroke={4} /> {t(`homepage:why${i}`)}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col md:grid md:grid-cols-2 gap-4 max-w-7xl m-auto mb-24 px-4">
        <CardLink
          href="/designs"
          title="Designs"
          icon={<DesignIcon className="w-10 h-10 shrink-0" />}
          text="Browse our collection of designs, and turn them into sewing patterns that are made-to-measure just for you."
        />
        <CardLink
          href="/showcase"
          title="Showcase"
          icon={<ShowcaseIcon className="w-10 h-10 shrink-0" />}
          text="Get inspiration from the FreeSewing community, and see how others have applied their creativity to our designs."
        />
        <CardLink
          href="/docs/guide"
          title="Getting Started"
          icon={<DocsIcon className="w-10 h-10 shrink-0" />}
          text="FreeSewing.org is unlike any sewing pattern website you know. Read this short guide to get the most our of our platform."
        />
        <CardLink
          href="/docs/faq"
          title="Frequently Asked Questions"
          icon={<HelpIcon className="w-10 h-10 shrink-0" />}
          text="Some of the questions that come up often when people discover our platform are answered here."
        />
      </div>

      <div className="lg:px-4 max-w-7xl mx-auto">
        <PleaseSubscribe />
      </div>

      <div className="max-w-7xl m-auto mb-24 px-4">
        <div className="w-full lg:w-1/2 m-auto">
          <CardLink
            href="/support"
            title="Need Help?"
            icon={<ChatIcon className="w-10 h-10 shrink-0" />}
            text="While we are all volunteers, we have a good track record of helping people. So don't be shy to reach out."
          />
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
