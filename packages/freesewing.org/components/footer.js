import Logo from 'shared/components/logos/freesewing.js'
import contributors from 'site/prebuild/allcontributors.js'
import patrons from 'site/prebuild/patrons.js'
import OsiLogo from 'shared/components/logos/osi.js'
import CreativeCommonsLogo from 'shared/components/logos/cc.js'
import CcByLogo from 'shared/components/logos/cc-by.js'
import { useTranslation } from 'next-i18next'
import PageLink from 'shared/components/page-link'
import DocsLink from 'shared/components/docs-link'
import PinkedRibbon from 'shared/components/pinked-ribbon.js'
import Worm from 'shared/components/worm.js'

// Classes
const link = "text-secondary font-bold hover:pointer hover:underline px-1"
const accent = "text-accent font-bold text-lg px-1 block sm:inline"
const freesewing = "px-1 text-lg font-bold block sm:inline"

// Keep these translations in the component because they're only used here
const translations = {
  cc: {
    en: <span>
          Content on FreeSewing.org is available under <a
          className={link} href="https://creativecommons.org/licenses/by/4.0/"
          >a Creative Commons license</a>
        </span>,
    de: <span>
          Inhalte auf FreeSewing.org sind unter einer <a
          className={link} href="https://creativecommons.org/licenses/by/4.0/deed.de"
          >Creative
          Commons-Lizenz</a> verfügbar
        </span>,
    es: <span>
          El contenido de FreeSewing.org está disponible bajo <a
          className={link} href="https://creativecommons.org/licenses/by/4.0/deed.es"
          >una licencia Creative Commons</a>
        </span>,
    fr: <span>
          Le contenu de FreeSewing.org est sous
          <a className={link} href="https://creativecommons.org/licenses/by/4.0/deed.fr"
          >licence Creative Commons</a>
        </span>,
    nl: <span>
          De inhoud op FreeSewing.org is beschikbaar onder
          <a className={link} href="https://creativecommons.org/licenses/by/4.0/deed.nl"
          >een Creative Commons licentie</a>
        </span>,
  },
  mit: {
    en: <span>
          The FreeSewing source code is <a
          href="https://github.com/freesewing/freesewing" className={link}
          >available on Github</a> under <a href="https://opensource.org/licenses/MIT"
          className={link}>the MIT license</a>
        </span>,
    de: <span>
          Der FreeSewing-Quellcode ist <a
          href="https://github.com/freesewing/freesewing" className={link}
          >auf Github verfügbar</a> unter <a href="https://opensource.org/licenses/MIT"
          className={link}>der MIT-Lizenz</a>
        </span>,
    es: <span>
          El código fuente de FreeSewing está <a
          href="https://github.com/freesewing/freesewing" className={link}
          >disponible en Github</a> bajo <a href="https://opensource.org/licenses/MIT"
          className={link}>la licencia MIT</a>
        </span>,
    fr: <span>
          Le code source de FreeSewing est <a
          href="https://github.com/freesewing/freesewing" className={link}
          >disponible sur Github</a> sous <a href="https://opensource.org/licenses/MIT"
          className={link}>la licence MIT</a>
        </span>,
    nl: <span>
          De FreeSewing broncode is <a
          href="https://github.com/freesewing/freesewing" className={link}
          >beschikbaar op Github</a> onder <a href="https://opensource.org/licenses/MIT"
          className={link}>de MIT licentie</a>
        </span>,
  },
  contributors: {
    en: <>
          <span className={freesewing}>FreeSewing</span> is made by these <span
          className={accent}>wonderful contributors</span>
        </>,
    de: <>
          <span className={freesewing}>FreeSewing</span> wird van diesen <span
          className={accent}>wunderbaren Mitwirkende</span> gemacht
        </>,
    es: <>
          <span className={freesewing}>FreeSewing</span> es hecho por estas <span
          className={accent}>maravillosxs contribuyente</span>
        </>,
    fr: <>
          <span className={freesewing}>FreeSewing</span> est fait par ces <span
          className={accent}>merveilleux contributeurs</span>
        </>,
    nl: <>
          <span className={freesewing}>FreeSewing</span> wordt gemaakt door deze <span
          className={accent}>wonderbaarlijke medewerkers</span>
        </>,
  },
  patrons: {
    en: <>
          <span className={freesewing}>FreeSewing</span> is supported by these <span
          className={accent}>generous patrons</span>
        </>,
    de: <>
          <span className={freesewing}>FreeSewing</span> wird von diesen <span
          className={accent}>großzügigen Gönnern</span> unterstützt
        </>,
    es: <>
          <span className={freesewing}>FreeSewing</span> cuenta con el apoyo de estos <span
          className={accent}>generosos patrocinadores</span>
        </>,
    fr: <>
          <span className={freesewing}>FreeSewing</span> est soutenu par ces <span
          className={accent}>généreux mécènes</span>
        </>,
    nl: <>
          <span className={freesewing}>FreeSewing</span> wordt ondersteund door deze <span
          className={accent}>gulle patrons</span>
        </>,
  },
  sponsors: {
    en: <>
          <span className={freesewing}>FreeSewing</span> is sponsored by these <span
          className={accent}>awesome companies</span>
        </>,
    de: <>
          <span className={freesewing}>FreeSewing</span> wird von diesen <span
          className={accent}>großartigen Unternehmen</span> gesponsert
        </>,
    es: <>
          <span className={freesewing}>FreeSewing</span> está patrocinado por estas <span
          className={accent}>increíbles empresas</span>
        </>,
    fr: <>
          <span className={freesewing}>FreeSewing</span> est sponsorisé par ces <span
          className={accent}>entreprises géniales</span>
        </>,
    nl: <>
          <span className={freesewing}>FreeSewing</span> wordt gesponsord door deze <span
          className={accent}>geweldige bedrijven</span>
        </>,
  },
  msf: {
    en: <>
          All <span className={freesewing}>FreeSewing</span> revenue goes to <span
          className={accent}>Doctors Without Borders</span>
        </>,
    de: <>
          Alle <span className={freesewing}>FreeSewing</span>-Einnahmen gehen an <span
          className={accent}>Ärzte ohne Grenzen</span>
        </>,
    es: <>
          Todos los ingresos de <span className={freesewing}>FreeSewing</span> van a <span
          className={accent}>Médicos sin Fronteras</span>
        </>,
    fr: <>
          Tous les revenus de <span className={freesewing}>FreeSewing</span> vont à <span
          className={accent}>Médecins Sans Frontières</span>
        </>,
    nl: <>
          Alle inkomsten van <span className={freesewing}>FreeSewing</span> gaan naar <span
          className={accent}>Artsen Zonder Grenzen</span>
        </>,
  },
}

const social = {
  Discord: 'https://discord.freesewing.org/',
  Instagram: 'https://instagram.com/freesewing_org',
  Facebook: 'https://www.facebook.com/groups/627769821272714/',
  Github: 'https://github.com/freesewing',
  Reddit: 'https://www.reddit.com/r/freesewing/',
  Twitter: 'https://twitter.com/freesewing_org',
}


const Footer = ({ app }) => {
  const { t } = useTranslation(['common', 'patrons'])

  return (
    <footer className="bg-neutral">
      <PinkedRibbon loading={app.loading} theme={app.theme} />
      <div className="p-4 py-16 flex flex-row bg-neutral -mt-1 z-0 gap-8 flex-wrap justify-around text-neutral-content">
        <div className="w-64 mt-2">
          <div className="px-4 mb-4"><CreativeCommonsLogo /></div>
          <div className="flex flex-row gap-2 justify-center items-center">
            <div className="basis-1/4">
              <CcByLogo />
            </div>
            <p className="text-sm text-neutral-content text-right basis-3/4">
              {translations.cc[app.locale]}
            </p>
          </div>
          <div className="flex flex-row gap-2 justify-center items-center">
            <div className="basis-1/4">
              <OsiLogo />
            </div>
            <p className="text-sm text-neutral-content text-right basis-3/4">
              {translations.mit[app.locale]}
            </p>
          </div>
        </div>

        <div className="w-full sm:w-auto">
          <h5 className="text-neutral-content">FIXME</h5>
          <div className="theme-gradient h-1 mb-4"></div>
          <ul>
            <li>
              Footer content goes here
            </li>
            <li>
              <DocsLink slug="docs/guide/what" />
            </li>
          </ul>
        </div>

        <div className="w-full sm:w-auto sm:max-w-xs">
          <h5 className="text-neutral-content">FIXME</h5>
          <div className="theme-gradient h-1 mb-2"></div>
          <ul>
            <li>
              Footer content goes here
            </li>
            <li>
              <DocsLink slug="docs/guide/what" />
            </li>
          </ul>
          <p className="text-sm text-neutral-content">
            <a className={link} href={social.discord}>Our Discord server</a> is
            the best place to ask questions and get help. It&apos;s where our community hangs out
            so you&apos;ll get the fastest response and  might even make a few new friends along the way.
          </p>
          <p className="text-sm text-neutral-content">
            You can also <a href={social.twitter} className={link} >reach out on Twitter</a> or <a
              href="https://github.com/freesewing/freesewing/issues/new/choose"
              className={link}
            > create an issue on Github </a> if Discord is not your jam.
          </p>
        </div>

        <div className="w-full sm:w-auto">
          <h5 className="text-neutral-content">Social Media</h5>
          <div className="theme-gradient h-1 mb-4"></div>
          <ul>
            {Object.keys(social).map(item => <li key={item}><PageLink href={social[item]} txt={item}/></li>)}
          </ul>
        </div>

        <div className="text-center">
          <Logo fill='currentColor' stroke='none' size={164} className="m-auto"/>
          <h5 className="text-neutral-content">FreeSewing</h5>
          <p className="bold text-neutral-content text-sm">
            {t('sloganCome')}
            <br />
            {t('sloganStay')}
          </p>
        </div>
      </div>
      <p className="text-center text-neutral-content text-sm px-2">
        {translations.contributors[app.locale]}
      </p>
      <div className="p-4 pb-16 flex flex-row bg-neutral -mt-2 z-0 gap-1 lg:gap-2 flex-wrap justify-around text-neutral-content lg:px-24">
        <Worm list={contributors.map(item => ({
          img: item.avatar_url,
          title: item.name,
          slug: item.profile
        }))} />
      </div>

      <p className="text-center text-neutral-content text-sm px-2">
        {translations.patrons[app.locale]}
      </p>
      <div className="p-4 pb-16 flex flex-row bg-neutral -mt-2 z-0 gap-1 lg:gap-2 flex-wrap justify-around text-neutral-content lg:px-24">
        <Worm list={patrons.map(item => ({
          img: item.img,
          title: item.name,
          slug: item.username
        }))} />
      </div>

      <p className="text-center text-neutral-content text-sm px-2">
        {translations.sponsors[app.locale]}
        <br />
      </p>
      <div className="p-4 py-16 flex flex-row bg-neutral -mt-2 z-0 gap-8 flex-wrap justify-center items-center text-neutral-content">
        <a title="Search powered by Algolia" href="https://www.algolia.com/">
          <img src="/brands/algolia.svg" className="w-64 mx-12 sm:mx-4" alt="Search powered by Algolia"/>
        </a>
        <a title="Error handling by Bugsnag" href="https://www.bugsnag.com/">
          <img src="/brands/bugsnag.svg" className="h-32 mx-12 sm:mx-4" alt="Error handling by bugsnag" />
        </a>
        <a title="Translation powered by Crowdin" href="https://www.crowdin.com/">
          <img src="/brands/crowdin.svg" className="w-64 mx-12 sm:mx-4" alt="Translation powered by Crowdin" />
        </a>
        <a title="Builds & hosting by Vercel" href="https://www.vercel.com/?utm_source=freesewing&utm_campaign=oss">
          <img src="/brands/vercel.svg" className="w-64 mx-12 sm:mx-4" alt="Builds & Hosting by Vercel" />
        </a>
      </div>

      <p className="text-center text-neutral-content text-sm px-2 my-20">
        {translations.msf[app.locale]}
        <br />
        [ <DocsLink slug="docs/various/pledge" /> ]
      </p>
    </footer>
  )
}

export default Footer

