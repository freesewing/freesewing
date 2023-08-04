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

const iconClasses = (i) => ({
  className: `w-8 lg:w-12 h-8 lg:h-12 text-spectrum-${i} hover:text-neutral`,
})

const outlineClasses = (i) => `hover:bg-spectrum-${i} rounded-full p-2 lg:p-4`
export const socialList = {
  MSF: {
    icon: <MsfIcon {...iconClasses(0)} fill />,
    href:
      siteConfig.tld === 'org'
        ? '/docs/various/pledge/'
        : 'https://freesewing.org/docs/various/pledge',
    name: 'Doctors Without Borders / Médecins Sans Frontières',
    community: false,
    className: outlineClasses(0),
  },
  Discord: {
    icon: <DiscordIcon {...iconClasses(1)} />,
    href: social.Discord,
    community: true,
    className: outlineClasses(1),
  },
  Instagram: {
    icon: <InstagramIcon {...iconClasses(2)} />,
    href: social.Instagram,
    community: true,
    className: outlineClasses(2),
  },
  Facebook: {
    icon: <FacebookIcon {...iconClasses(3)} />,
    href: social.Facebook,
    community: true,
    className: outlineClasses(3),
  },
  GitHub: {
    icon: <GitHubIcon {...iconClasses(4)} />,
    href: social.GitHub,
    community: true,
    className: outlineClasses(4),
  },
  Reddit: {
    icon: <RedditIcon {...iconClasses(5)} />,
    href: social.Reddit,
    community: true,
    className: outlineClasses(5),
  },
  Twitter: {
    icon: <TwitterIcon {...iconClasses(6)} />,
    href: social.Twitter,
    community: true,
    className: outlineClasses(6),
  },
  YouTube: {
    icon: <YouTubeIcon {...iconClasses(7)} fill stroke={0} />,
    href: social.YouTube,
    community: true,
    className: outlineClasses(7),
  },
  'Open Souce License: MIT': {
    icon: <OpenSourceIcon {...iconClasses(8)} />,
    href: 'https://github.com/freesewing/freesewing/blob/develop/LICENSE',
    community: false,
    className: outlineClasses(8),
  },
  'Contact Information': {
    icon: <HelpIcon {...iconClasses(9)} />,
    href: '/contact',
    community: false,
    className: outlineClasses(9),
  },
}

export const SocialIcons = () => {
  const list = socialList

  return Object.keys(list).map((item) => (
    <Link key={item} href={list[item].href} title={item} className={list[item].className}>
      {list[item].icon}
    </Link>
  ))
}
