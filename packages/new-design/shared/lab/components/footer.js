import Logo from 'shared/components/logos/freesewing.js'
import { useTranslation } from 'next-i18next'
import Ribbon from 'shared/components/ribbon.js'
import Link from 'next/link'
import { WordMark } from 'shared/components/wordmark.js'

import DiscordIcon from 'shared/components/icons/discord.js'
import FacebookIcon from 'shared/components/icons/facebook.js'
import GithubIcon from 'shared/components/icons/github.js'
import InstagramIcon from 'shared/components/icons/instagram.js'
import RedditIcon from 'shared/components/icons/reddit.js'
import TwitterIcon from 'shared/components/icons/twitter.js'

const icon = { className: 'w-8 lg:w-12 h-8 lg:h-12' }
const social = {
  Discord: {
    icon: <DiscordIcon {...icon} />,
    href: 'https://discord.freesewing.org/',
  },
  Instagram: {
    icon: <InstagramIcon {...icon} />,
    href: 'https://instagram.com/freesewing_org',
  },
  Facebook: {
    icon: <FacebookIcon {...icon} />,
    href: 'https://www.facebook.com/groups/627769821272714/',
  },
  Github: {
    icon: <GithubIcon {...icon} />,
    href: 'https://github.com/freesewing',
  },
  Reddit: {
    icon: <RedditIcon {...icon} />,
    href: 'https://www.reddit.com/r/freesewing/',
  },
  Twitter: {
    icon: <TwitterIcon {...icon} />,
    href: 'https://twitter.com/freesewing_org',
  },
}

const Footer = ({ app }) => {
  const { t } = useTranslation(['common', 'patrons'])

  return (
    <footer className="bg-neutral mt-20">
      <Ribbon loading={app.loading} theme={app.theme} />
      <div className="py-12 2xl:py-20 text-neutral-content px-4 m-auto">
        {/* Logo & Slogan */}
        <div className="w-full mb-12 text-center">
          <div className="max-w-md m-auto">
            <Logo stroke="none" size={164} className="w-40 lg:w-64 m-auto m-auto" />
            <h5 className="lg:text-3xl mt-4">
              <WordMark />
            </h5>
            <p className="bold text-neutral-content text-normal lg:text-xl leading-5">
              {t('sloganCome')}
              <br />
              {t('sloganStay')}
            </p>
          </div>
        </div>
        {/* Second col - Social */}
        <div className="lg:col-span-2 -order-2 2xl:order-2 px-4 lg:px-0">
          {/* Social icons */}
          <div className="w-full sm:w-auto flex flex-row flex-wrap gap-4 lg:gap-8 items-center justify-center">
            {Object.keys(social).map((item) => (
              <Link
                key={item}
                href={social[item].href}
                className="hover:text-secondary hover:-mt-2 transition-all"
                title={item}
              >
                {social[item].icon}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
