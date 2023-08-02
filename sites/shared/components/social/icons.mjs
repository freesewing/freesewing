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
import { social } from 'config/social.mjs'
import { siteConfig } from 'site/site.config.mjs'

// force tailwind compilation
const hoverClasses = [
  'hover:text-spectrum-focus-0',
  'hover:text-spectrum-focus-1',
  'hover:text-spectrum-focus-2',
  'hover:text-spectrum-focus-3',
  'hover:text-spectrum-focus-4',
  'hover:text-spectrum-focus-5',
  'hover:text-spectrum-focus-6',
  'hover:text-spectrum-focus-7',
  'hover:text-spectrum-focus-8',
  'hover:text-spectrum-focus-9',
  'hover:text-spectrum-focus-10',
]

const iconClasses = (i) => ({
  className: `w-8 lg:w-12 h-8 lg:h-12 text-spectrum-${i} ${hoverClasses[i]}`,
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

export const SocialIcons = () => {
  const list = socialList

  return Object.keys(list).map((item) => (
    <Link key={item} href={list[item].href} title={item}>
      {list[item].icon}
    </Link>
  ))
}
