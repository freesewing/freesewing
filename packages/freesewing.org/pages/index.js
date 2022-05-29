import Page from 'site/components/wrappers/page.js'
import useApp from 'site/hooks/useApp.js'
import Head from 'next/head'
import HelpUs from 'site/components/help-us.js'
import Link from 'next/link'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import Layout from 'site/components/layouts/bare'
import Navigation, { Icons } from 'shared/components/navigation/primary'
import DownIcon from 'shared/components/icons/down.js'

const HomePage = (props) => {
  const app = useApp()
  const { t } = useTranslation(['homepage', 'ograph'])

  return (
    <Page app={app} title="Welcome to FreeSewing.org" layout={Layout}>
      <Head>
        <meta property="og:title" content="FreeSewing.org" key="title" />
        <meta property="og:type" content="article" key='type' />
        <meta property="og:description" content={t('ograph:orgDesc')} key='description' />
        <meta property="og:article:author" content='Joost De Cock' key='author' />
        <meta property="og:image" content={`https://canary.backend.freesewing.org/og-img/${app.locale}/org/`} key='image' />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content="https://freesewing.org/" key='url' />
        <meta property="og:locale" content={app.locale} key='locale' />
        <meta property="og:site_name" content="freesewing.org" key='site' />
      </Head>
        <section
          style={{
            backgroundImage: "url('/img/splash.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: '40% 50%',
          }}
          className="m-0 p-0 shadow drop-shadow-lg w-full mb-8"
        >
          <div className="mx-auto px-8 flex flex-col items-center justify-between min-h-screen">
            <span>&nbsp;</span>
            <div>
              <div className="flex flex-col items-end max-w-4xl">
                <h1
                  className={`
                    text-4xl font-black text-right px-4
                    sm:text-6xl
                    md:text-7xl px-6
                    lg:px-8
                    bg-primary
                    `}
                  style={{ textShadow: '1px 1px 3px #000', color: 'white' }}
                >
                  FreeSewing
                  <span className="font-light">.org</span>
                </h1>
                <h2
                  className={`
                    text-right text-2xl mr-0
                    sm:text-3xl
                    md:text-4xl
                    lg:max-w-1/2 lg:text-4xl xl:pr-0 `}
                  style={{ textShadow: '1px 1px 3px #000', color: 'white' }}
                  dangerouslySetInnerHTML={{ __html: t('ograph:orgDescription')}}
                />
              </div>
              <Icons app={app}  active='/'
                ulClasses="flex flex-row flex-wrap mt-8 justify-between w-full max-w-7xl"
                liClasses="text-neutral-content w-1/3 my-4 lg:mx-2 lg:w-40"
                linkClasses={`
                  text-lg lg:text-xl py-1 text-secondary
                  hover:text-secondary sm:hover:text-secondary-focus hover:cursor-pointer
                  flex flex-col items-center capitalize`}
              />
            </div>
            <div className="text-neutral-content text-center mt-8 text-center">
              {t('scrollDownToLearnMore')}
              <DownIcon className="w-24 h-24 animate-bounce w-full m-auto mt-8"/>
            </div>
          </div>
        </section>
      <div>
      <div className="max-w-7xl m-auto my-32">
        <div className="bg-cover bg-neutral w-full bg-center rounded-lg shadow p-4 "
          style={{backgroundImage: "url(/support.jpg)"}}
        >
          <h2 className="text-neutral-content p-4 text-4xl font-bold sm:font-light sm:text-6xl drop-shadow">Support FreeSewing</h2>
          <p className="text-neutral-content p-4 font-bold max-w-md text-lg">
            FreeSewing is fuelled by a voluntary subscription model
          </p>
          <p className="text-neutral-content p-4 font-bold max-w-md text-lg">
            If you think what we do is worthwhile,
            and if you can spare a few coins each month without hardship,
            please support our work
          </p>
          <a role="button" className="btn btn-accent btn-wide ml-4 mb-8" href="https://freesewing.org/patrons/join">Become a Patron</a>
        </div>
      </div>
      <div className="max-w-7xl m-auto my-32">
        <div className="px-8 text-base-content">
          <Icons app={app}
            active='/'
            ulClasses="flex flex-row flex-wrap mt-8 justify-around w-full max-w-6xl"
            liClasses="w-1/3 my-4 lg:mx-2 lg:w-24"
            linkClasses={`
              text-lg lg:text-xl py-1 text-base-content
              hover:text-secondary sm:hover:text-secondary-focus hover:cursor-pointer
              flex flex-col items-center capitalize`}
          />
        </div>
      </div>
      <div className="max-w-xl m-auto my-32">
        <HelpUs slug='/' />
      </div>
    </div>

    </Page>
  )
}

export default HomePage

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    }
  }
}

