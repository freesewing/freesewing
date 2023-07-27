import Link from 'next/link'
import {
  MsfIcon,
  HelpIcon,
  DiscordIcon,
  FacebookIcon,
  GitHubIcon,
  InstagramIcon,
  RedditIcon,
  TwitterIcon,
  OpenSourceIcon,
  YouTubeIcon,
} from 'shared/components/icons.mjs'
import { colors } from 'shared/components/wordmark.mjs'
import { social } from 'config/social.mjs'
import { siteConfig } from 'site/site.config.mjs'

const iconClasses = (i) => ({
  className: `w-8 lg:w-12 h-8 lg:h-12 text-${colors[i]}-400 hover:text-neutral-content`,
})

export const socialList = {
  MSF: {
    icon: <MsfIcon {...iconClasses(0)} fill />,
    href:
      siteConfig.tld === 'org'
        ? '/docs/various/pledge/'
        : 'https://freesewing.org/docs/various/pledge',
    name: 'Doctors Without Borders / Médecins Sans Frontières',
    community: false,
  },
  Discord: {
    icon: <DiscordIcon {...iconClasses(1)} />,
    href: social.Discord,
    community: true,
  },
  Instagram: {
    icon: <InstagramIcon {...iconClasses(2)} />,
    href: social.Instagram,
    community: true,
  },
  Facebook: {
    icon: <FacebookIcon {...iconClasses(3)} />,
    href: social.Facebook,
    community: true,
  },
  GitHub: {
    icon: <GitHubIcon {...iconClasses(4)} />,
    href: social.GitHub,
    community: true,
  },
  Reddit: {
    icon: <RedditIcon {...iconClasses(5)} />,
    href: social.Reddit,
    community: true,
  },
  Twitter: {
    icon: <TwitterIcon {...iconClasses(6)} />,
    href: social.Twitter,
    community: true,
  },
  YouTube: {
    icon: <YouTubeIcon {...iconClasses(7)} fill stroke={0} />,
    href: social.YouTube,
    community: true,
  },
  'Open Souce License: MIT': {
    icon: <OpenSourceIcon {...iconClasses(8)} />,
    href: 'https://github.com/freesewing/freesewing/blob/develop/LICENSE',
    community: false,
  },
  'Contact Information': {
    icon: <HelpIcon {...iconClasses(9)} />,
    href: '/contact',
    community: false,
  },
}

export const SocialIcons = () =>
  Object.keys(socialList).map((item) => (
    <Link key={item} href={socialList[item].href} className="hover:text-secondary" title={item}>
      {socialList[item].icon}
    </Link>
  ))
