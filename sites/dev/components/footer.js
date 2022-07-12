import Logo from 'shared/components/logos/freesewing.js'
import OsiLogo from 'shared/components/logos/osi.js'
import CreativeCommonsLogo from 'shared/components/logos/cc.js'
import CcByLogo from 'shared/components/logos/cc-by.js'
import { useTranslation } from 'next-i18next'
import PinkedRibbon from 'shared/components/pinked-ribbon.js'
import Link from 'next/link'

import DiscordIcon from 'shared/components/icons/discord.js'
import FacebookIcon from 'shared/components/icons/facebook.js'
import GithubIcon from 'shared/components/icons/github.js'
import InstagramIcon from 'shared/components/icons/instagram.js'
import RedditIcon from 'shared/components/icons/reddit.js'
import TwitterIcon from 'shared/components/icons/twitter.js'

// Classes
const link = "text-secondary font-bold hover:pointer hover:underline px-1"
const accent = "text-accent font-bold text-lg px-1 block sm:inline"
const freesewing = "px-1 text-lg font-bold block sm:inline"

// Keep these translations in the component because they're only used here
const translations = {
  cc: <span>
    Content on FreeSewing.org is available under <a
    className={link} href="https://creativecommons.org/licenses/by/4.0/"
    >a Creative Commons license</a>
  </span>,
  mit: <span>
    The FreeSewing source code is <a
    href="https://github.com/freesewing/freesewing" className={link}
    >available on Github</a> under <a href="https://opensource.org/licenses/MIT"
    className={link}>the MIT license</a>
  </span>,
  sponsors: <>
    <span className={freesewing}>FreeSewing</span> is sponsored by these <span
    className={accent}>awesome companies</span>
  </>,
}

const icon = { className: "w-20 h-20" }
const social = {
  Discord: {
    icon: <DiscordIcon {...icon}/>,
    href: 'https://discord.freesewing.org/'
  },
  Instagram: {
    icon: <InstagramIcon {...icon}/>,
    href: 'https://instagram.com/freesewing_org'
  },
  Facebook: {
    icon: <FacebookIcon {...icon}/>,
    href: 'https://www.facebook.com/groups/627769821272714/'
  },
  Github: {
    icon: <GithubIcon {...icon} />,
    href: 'https://github.com/freesewing'
  },
  Reddit: {
    icon: <RedditIcon {...icon} />,
    href: 'https://www.reddit.com/r/freesewing/'
  },
  Twitter: {
    icon: <TwitterIcon {...icon} />,
    href: 'https://twitter.com/freesewing_org'
  }
}


const Footer = ({ app, full=false }) => {
  const { t } = useTranslation(['common', 'patrons'])

  return (
    <footer className="bg-neutral">
      <PinkedRibbon loading={app.loading} theme={app.theme} />
      <div className="px-8 py-20 2xl:py-40 flex flex-row gap-8 flex-wrap 2xl:flex-nowrap justify-around text-neutral-content">

        {/* First col - CC & MIT */}
        <div className="max-w-md mb-20 order-1 mt-20 2xl:mt-0">
          <div className="max-w-md m-auto">
            <div><CreativeCommonsLogo className="w-80 m-auto"/></div>
            <div className="flex flex-row gap-2 justify-center items-center mt-8">
              <CcByLogo className="w-16"/>
              <p className="text-neutral-content text-right basis-3/4">
                {translations.cc}
              </p>
            </div>
            <div className="flex flex-row gap-2 justify-center items-center mt-4">
                <OsiLogo className="w-16"/>
              <p className="text-neutral-content text-right basis-3/4">
                {translations.mit}
              </p>
            </div>
          </div>
        </div>

        {/* Second col - Social & Sponsors */}
        <div className="w-full 2xl:w-fit -order-2 2xl:order-2">
          {/* Social icons */}
          <div className="w-full sm:w-auto flex flex-row flex-wrap gap-8 items-center justify-center">
            {Object.keys(social).map(item => (
              <Link key={item} href={social[item].href}>
                <a className="hover:text-secondary-focus hover:-mt-2 transition-all" title={item}>
                  {social[item].icon}
                </a>
              </Link>
            ))}
          </div>
          {/* Sponsors */}
          <div className="border rounded-xl p-8 border-dashed border-base-100/25 mt-20">
          <p className="text-center text-neutral-content">
            {translations.sponsors}
            <br />
          </p>
          <div className="p-4 flex flex-row gap-4 xl:gap-8 flex-wrap justify-center items-center text-neutral-content shrink">
            <a title="Search powered by Algolia" href="https://www.algolia.com/">
              <img src="/brands/algolia.svg" className="w-64" alt="Search powered by Algolia"/>
            </a>
            <a title="Error handling by Bugsnag" href="https://www.bugsnag.com/">
              <img src="/brands/bugsnag.svg" className="h-32" alt="Error handling by bugsnag" />
            </a>
            <a title="Translation powered by Crowdin" href="https://www.crowdin.com/">
              <img src="/brands/crowdin.svg" className="w-64" alt="Translation powered by Crowdin" />
            </a>
            <a title="Builds & hosting by Vercel" href="https://www.vercel.com/?utm_source=freesewing&utm_campaign=oss">
              <img src="/brands/vercel.svg" className="w-64 shadow-lg shadow-white/20" alt="Builds & Hosting by Vercel" />
            </a>
          </div>
          </div>
        </div>

        {/* Col 3 - Logo & Slogan */}
        <div className="w-full 4xl:w-auto xl:max-w-md mb-20 text-center order-3 mt-20 2xl:mt-0">
          <div className="max-w-md m-auto">
            <Logo stroke="none" size={164} className="w-40 lg:w-64 m-auto m-auto" />
            <h5 className="text-neutral-content lg:text-3xl mt-4">FreeSewing</h5>
            <p className="bold text-neutral-content text-normal lg:text-xl">
              {t('sloganCome')}
              <br />
              {t('sloganStay')}
            </p>
          </div>
        </div>

      </div>
    </footer>
  )
}

export default Footer

