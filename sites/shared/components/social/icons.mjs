import Link from 'next/link'
import { useTheme } from 'shared/hooks/use-theme.mjs'
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

const iconClasses = (color) => ({
  className: `w-8 lg:w-12 h-8 lg:h-12 text-${color} hover:text-neutral-content`,
})

export const socialList = (spectrum) => ({
  MSF: {
    icon: <MsfIcon {...iconClasses(spectrum[0])} fill />,
    href:
      siteConfig.tld === 'org'
        ? '/docs/various/pledge/'
        : 'https://freesewing.org/docs/various/pledge',
    name: 'Doctors Without Borders / Médecins Sans Frontières',
    community: false,
  },
  Discord: {
    icon: <DiscordIcon {...iconClasses(spectrum[1])} />,
    href: social.Discord,
    community: true,
  },
  Instagram: {
    icon: <InstagramIcon {...iconClasses(spectrum[2])} />,
    href: social.Instagram,
    community: true,
  },
  Facebook: {
    icon: <FacebookIcon {...iconClasses(spectrum[3])} />,
    href: social.Facebook,
    community: true,
  },
  GitHub: {
    icon: <GitHubIcon {...iconClasses(spectrum[4])} />,
    href: social.GitHub,
    community: true,
  },
  Reddit: {
    icon: <RedditIcon {...iconClasses(spectrum[5])} />,
    href: social.Reddit,
    community: true,
  },
  Twitter: {
    icon: <TwitterIcon {...iconClasses(spectrum[6])} />,
    href: social.Twitter,
    community: true,
  },
  YouTube: {
    icon: <YouTubeIcon {...iconClasses(spectrum[7])} fill stroke={0} />,
    href: social.YouTube,
    community: true,
  },
  'Open Souce License: MIT': {
    icon: <OpenSourceIcon {...iconClasses(spectrum[8])} />,
    href: 'https://github.com/freesewing/freesewing/blob/develop/LICENSE',
    community: false,
  },
  'Contact Information': {
    icon: <HelpIcon {...iconClasses(spectrum[9])} />,
    href: '/contact',
    community: false,
  },
})

export const SocialIcons = () => {
  const { spectrum } = useTheme()
  const list = socialList(spectrum)

  return Object.keys(list).map((item) => (
    <Link key={item} href={list[item].href} className="hover:text-secondary" title={item}>
      {list[item].icon}
    </Link>
  ))
}
