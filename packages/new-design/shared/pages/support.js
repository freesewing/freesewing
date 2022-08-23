import Page from 'site/components/wrappers/page.js'
import useApp from 'site/hooks/useApp.js'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Layout from 'site/components/layouts/docs'
import { useTranslation } from 'next-i18next'
import DiscordIcon from 'shared/components/icons/discord'
import GithubIcon from 'shared/components/icons/github'
import CcIcon from 'shared/components/icons/community'
import HeartIcon from 'shared/components/icons/heart'
import DocsIcon from 'shared/components/icons/docs'

const gh = `<a class="text-secondary hover:text-secondary-focus"
href="https://github.com/freesewing/freesewing">freesewing/freesewing</a>`
const fsd = `<a class="text-secondary hover:text-secondary-focus"
href="https://freesewing.dev">freesewing.dev</a>`

const translations = {
  discord: {
    en: `Our Discord server on is the best place to ask questions, or hang
         out with other members of the FreeSewing community.`,
    nl: `Onze Discord server is de best plek om vragen te stellen, hulp te ontvangen,
        of gewoon een leuke tijd te spenderen met andere leden van de FreeSewing gemeenschap.`,
  },
  github: {
    en: `For bug reports, please create an issue in the ${gh} repository on Github.
          This is also where you'll find all our source code.`,
    nl: `Een bug gevonden? Maak dan een issue aan in de ${gh} repository op Github.
         Dit is ook waar je al de FreeSewing broncode kan vinden.`,
  },
  cc: {
    en: `Every two weeks, there's the FreeSewing contributor call, which is when we discuss
        ongoing issues, future plans, and news big and small about FreeSewing and its community.`,
    nl: `Elke twee weken is er de FreeSewing contributor call (Engelstalig), waar de FreeSewing
         vrijwilligers de lopende zaken bespreken. Ook de plannen voor de toekomst en groot en klein
         nieuws over FreeSewing en de gemeenschap komen aan bod.`
  },
  docs: {
    en: `Our documentation for developers hosted on ${fsd}. You can find guides and how-to's
         there, as well as reference documantation for FreeSewing's core API.
         <br /> <br />
         We stive to provide excellent documentation. So if something is not clear please, let us know.`,
    nl: `Onze documentatie voor ontwikkelaars is beschikbaar op ${fsd}. Je vindt er guides en how-to's,
         alsook de referentie documentatie voor FreeSewing's core API.
         <br /> <br />
         We streven ernaar om uitstekende documentatie te voorzien. Dus als er iets niet duidelijk is, laat
         het ons dan zeker weten.`,
  },
}

const SupportPage = (props) => {
  const app = useApp()
  const { t } = useTranslation(['common', 'patrons'])
  return (
    <Page app={app} title={t('support')} layout={Layout}>

      <h2>Discord</h2>
      <div className="flex flex-row flex-wrap gap-2">
        <p className="max-w-3xl">
          {translations.discord[app.locale]}
        </p>
        <a className="btn btn-primary btn-lg w-96"
          href="https://discord.freesewing.org/">
          <DiscordIcon />
          <span className="ml-4">discord.freesewing.org</span>
        </a>
      </div>

      <h2>Github</h2>
      <div className="flex flex-row flex-wrap gap-2">
        <p className="max-w-3xl"
          dangerouslySetInnerHTML={{__html: translations.github[app.locale]}}/>
        <a className="btn btn-primary btn-outline btn-lg w-96"
          href="https://github.com/freesewing/freesewing">
          <GithubIcon />
          <span className="ml-4">github.com/freesewing</span>
        </a>
      </div>

      <h2>{t('docs')}</h2>
      <div className="flex flex-row flex-wrap gap-2">
        <p className="max-w-3xl"
          dangerouslySetInnerHTML={{__html: translations.docs[app.locale]}}/>
        <a className="btn btn-primary btn-outline btn-lg w-96"
          href="https://freesewing.dev/">
          <DocsIcon />
          <span className="ml-4">www.FreeSewing.dev</span>
        </a>
      </div>

      <h2>Contributor Calls</h2>
      <div className="flex flex-row flex-wrap gap-2">
        <p className="max-w-3xl"
          dangerouslySetInnerHTML={{__html: translations.cc[app.locale]}}/>
        <a className="btn btn-primary btn-outline btn-lg w-96"
          href="https://github.com/freesewing/freesewing/discussions?discussions_q=label%3A%22%3Atv%3A+fscc%22">
          <CcIcon />
          <span className="ml-4">Contributor Calls</span>
        </a>
      </div>


      <div className="py-20">
        <h2>{t('patrons:supportFreesewing')}</h2>
        <div className="flex flex-row flex-wrap gap-2">
          <div>
            <p className="max-w-3xl">{t('patrons:patronLead')}</p>
            <p className="max-w-3xl">{t('patrons:patronPitch')}</p>
          </div>
          <a className="btn btn-accent btn-lg w-96">
            <HeartIcon className="fill-accent-content stroke-accent-content w-6 h-6"/>
            <span className="ml-4">{t('patrons:becomeAPatron')}</span>
          </a>
        </div>
      </div>

    </Page>
  )
}

export default SupportPage

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    }
  }
}



