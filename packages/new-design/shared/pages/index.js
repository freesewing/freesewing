import Page from 'site/components/wrappers/page.js'
import useApp from 'site/hooks/useApp.js'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Layout from 'site/components/layouts/docs'
import { useTranslation } from 'next-i18next'
import FsIcon from 'shared/components/icons/freesewing'
import Link from 'next/link'
import Popout from 'shared/components/popout'
import { useRouter } from 'next/router'
import themes from 'shared/themes/index.js'

const translations = {
  sade: {
    en: `Stand-alone development environment`,
    nl: `Vrijstaande ontwikkeling omgeving`,
  },
  load: {
    en: `To your design`,
    nl: `Naar jouw ontwerp`,
  },
  tips: {
    en: <Popout tip compact>Edit the files in the <strong>design</strong> folder, and we'll auto-update your design</Popout>,
    nl: <Popout tip compact>Bewerk de bestanden in de <strong>design</strong> map, en we passen je ontwerp automatisch aan</Popout>,
  },
}

const HomePage = (props) => {
  const app = useApp()
  const router = useRouter()
  const { t } = useTranslation(['common', 'patrons', 'locales', 'themes'])

  return (
    <Page app={app} title={false} layout={Layout}>
      <div className="text-center w-full pt-20 pb-10 max-w-4xl m-auto">
        <FsIcon className="w-96 m-auto" />
        <h1>FreeSewing</h1>
        <h4>{translations.sade[app.locale]}</h4>
        <Link href="/design">
          <a className="btn btn-primary btn-lg h-20 my-8 mb-12">
            <span role='image' className="text-4xl px-6">👉</span>
            <span className="text-xl px-2">{translations.load[app.locale]}</span>
            <span role='image' className="text-4xl px-6">👈</span>
          </a>
        </Link>
        {translations.tips[app.locale]}
      </div>
      <div className="flex flex-row flex-wrap gap-4 w-full max-w-4xl m-auto justify-center">
        {router.locales.map(locale => (
          <Link href={router.asPath} locale={locale} key={locale}>
            <a className="btn btn-ghost text-base-content hover:bg-base-200">
              <span className="text-base-content">
                {t(`locales:${locale}`)}
              </span>
            </a>
          </Link>
        ))}
      </div>
      <div className="flex flex-row flex-wrap gap-4 w-full max-w-4xl m-auto justify-center mt-4">
          {Object.keys(themes).map(theme => (
            <button
              key={theme}
              onClick={() => app.setTheme(theme)}
              className="btn btn-ghost hover:bg-base-200"
            >
              <span className="text-base-content">
                {t(`themes:${theme}Theme`)}
              </span>
            </button>
          ))}
      </div>


      <div className="py-20">
        <h2>{t('patrons:supportFreesewing')}</h2>
        <div className="flex flex-row flex-wrap gap-2">
          <div>
            <p className="max-w-3xl">{t('patrons:patronLead')}</p>
            <p className="max-w-3xl">{t('patrons:patronPitch')}</p>
          </div>
          <a className="btn btn-accent btn-lg ">
            <span role='image' className="text-4xl px-4">🥰</span>
            <span className="px-2">{t('patrons:becomeAPatron')}</span>
            <span role='image' className="text-4xl px-4">🙏🏻</span>
          </a>
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



