// Dependencies
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
//import { useTranslation } from 'next-i18next'
import Head from 'next/head'
// Components
import { PageWrapper } from 'shared/components/wrappers/page.mjs'
import { Popout } from 'shared/components/popout.mjs'
import { PageLink } from 'shared/components/page-link.mjs'

/*
 * Each page MUST be wrapped in the PageWrapper component.
 * You also MUST spread props.page into this wrapper component
 * when path and locale come from static props (as here)
 * or set them manually.
 */
const HomePage = ({ page }) => (
  <PageWrapper {...page}>
    <Head>
      <title>Welcome to FreeSewing.org</title>
    </Head>
    <div>
      <div className="max-w-xl m-auto my-32 px-6">
        <Popout fixme>
          Create homepage. Meanwhile check <PageLink href="/signup" txt="the signup flow" />
        </Popout>
      </div>
    </div>
  </PageWrapper>
)

export default HomePage

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
      page: {
        locale,
        path: [],
      },
    },
  }
}
/*
// Hooks
import { useApp } from 'site/hooks/useApp.mjs'
import { useTranslation } from 'next-i18next'
// Dependencies
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
// Components
import Head from 'next/head'
import { PageWrapper } from 'site/components/wrappers/page.mjs'
import { BareLayout } from 'site/components/layouts/bare.mjs'
import { Icons } from 'shared/components/navigation/primary.mjs'

const title = 'Welcome to the FreeSewing Lab'

const HomePage = () => {
  const app = useApp()
  const { t } = useTranslation(['lab'])
  return (
    <PageWrapper app={app} title="{title}" layout={BareLayout}>
      <Head>
        <meta property="og:title" content="FreeSewing.dev" key="title" />
        <meta property="og:type" content="article" key="type" />
        <meta
          property="og:description"
          content="Documentation and tutorials for FreeSewing developers and contributors. Plus our Developers Blog"
          key="description"
        />
        <meta property="og:article:author" content="Joost De Cock" key="author" />
        <meta
          property="og:image"
          content="https://canary.backend.freesewing.org/og-img/en/dev/"
          key="image"
        />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content="https://freesewing.dev/" key="url" />
        <meta property="og:locale" content="en_US" key="locale" />
        <meta property="og:site_name" content="freesewing.dev" key="site" />
        <title>{title}</title>
      </Head>
      <section
        style={{
          backgroundImage: "url('/img/splash.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: '40% 50%',
        }}
        className="m-0 p-0 shadow drop-shadow-lg w-full mb-8"
      >
        <div className="mx-auto px-8 flex flex-col items-center justify-center min-h-screen py-24 lg:min-h-0 lg:py-96">
          <div className="flex flex-col items-end max-w-4xl">
            <h1
              className={`
                  text-3xl font-black text-right px-4
                  sm:text-6xl
                  md:text-7xl px-6
                  lg:px-8
                  bg-accent
                  `}
              style={{ textShadow: '1px 1px 3px #000', color: 'white' }}
            >
              <span className="font-light">lab.</span>
              FreeSewing
              <span className="font-light">.dev</span>
            </h1>

            <h2
              className={`
                  text-xl mr-0 mt-4 font-bold
                  sm:text-3xl
                  md:text-4xl
                  lg:max-w-1/2 lg:text-4xl
                  xl:pr-0 `}
              style={{ textShadow: '1px 1px 3px #000', color: 'white' }}
            >
              {t('slogan')}:
            </h2>
            <ul
              className={`
                  text-xl mr-8 font-bold list list-inside list-disc
                  sm:text-3xl
                  md:text-4xl
                  lg:max-w-1/2 lg:text-3xl
                  xl:pr-0 `}
              style={{ textShadow: '1px 1px 3px #000', color: 'white' }}
            >
              <li>{t('slogan1')}</li>
              <li>{t('slogan2')}</li>
              <li>{t('slogan3')}</li>
              <li>{t('slogan4')}</li>
            </ul>
          </div>
          <Icons
            app={app}
            active="/"
            ulClasses="flex flex-row flex-wrap mt-8 justify-around w-full max-w-6xl"
            liClasses="text-neutral-content w-1/2 my-4 lg:mx-2 lg:w-24"
            linkClasses={`
                text-lg lg:text-xl py-1 text-secondary text-center
                hover:text-secondary sm:hover:text-secondary-focus hover:cursor-pointer
                flex flex-col items-center capitalize`}
          />
          <p className="text-neutral-content text-center mt-8">
            To learn more about FreeSewing and try our platform go to{' '}
            <a
              href="https://freesewing.org/"
              title="Go to FreeSewing.org"
              className="text-secondary font-bold"
            >
              freesewing.org
            </a>
          </p>
        </div>
      </section>
      <div>
        <div className="max-w-7xl m-auto my-32">
          <div
            className="bg-cover bg-neutral w-full bg-center rounded-lg shadow p-4 "
            style={{ backgroundImage: 'url(/support.jpg)' }}
          >
            <h2 className="text-neutral-content p-4 text-4xl font-bold sm:font-light sm:text-6xl drop-shadow">
              Support FreeSewing
            </h2>
            <p className="text-neutral-content p-4 font-bold max-w-md text-lg">
              FreeSewing is fuelled by a voluntary subscription model
            </p>
            <p className="text-neutral-content p-4 font-bold max-w-md text-lg">
              If you think what we do is worthwhile, and if you can spare a few coins each month
              without hardship, please support our work
            </p>
            <a
              role="button"
              className="btn btn-accent btn-wide ml-4 mb-8"
              href="https://freesewing.org/patrons/join"
            >
              Become a Patron
            </a>
          </div>
        </div>
        <div className="max-w-7xl m-auto my-32">
          <div className="px-8 text-base-content">
            <Icons
              app={app}
              active="/"
              ulClasses="flex flex-row flex-wrap mt-8 justify-around w-full max-w-6xl"
              liClasses="w-1/3 my-4 lg:mx-2 lg:w-24"
              linkClasses={`
              text-lg lg:text-xl py-1 text-base-content text-center
              hover:text-secondary sm:hover:text-secondary-focus hover:cursor-pointer
              flex flex-col items-center capitalize`}
            />
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}

export default HomePage

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  }
}

*/
