//  __SDEFILE__ - This file is a dependency for the stand-alone environment
import Link from 'next/link'
import { useTheme } from 'shared/hooks/use-theme.mjs'
import {
  MsfIcon,
  HeartIcon,
  DiscordIcon,
  FacebookIcon,
  GitHubIcon,
  InstagramIcon,
  RedditIcon,
  MastodonIcon,
  CloudIcon,
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
  GitHub: {
    icon: <GitHubIcon {...iconClasses(spectrum[1])} />,
    href: social.GitHub,
    community: true,
  },
  Mastodon: {
    icon: <MastodonIcon {...iconClasses(spectrum[2])} />,
    href: social.Mastodon,
    community: true,
  },
  Instagram: {
    icon: <InstagramIcon {...iconClasses(spectrum[3])} />,
    href: social.Instagram,
    community: true,
  },
  Bluesky: {
    icon: <CloudIcon {...iconClasses(spectrum[4])} stroke={2} />,
    href: social.YouTube,
    community: true,
  },
  Discord: {
    icon: <DiscordIcon {...iconClasses(spectrum[5])} />,
    href: social.Discord,
    community: true,
  },
  Facebook: {
    icon: <FacebookIcon {...iconClasses(spectrum[6])} />,
    href: social.Facebook,
    community: true,
  },
  Reddit: {
    icon: <RedditIcon {...iconClasses(spectrum[7])} />,
    href: social.Reddit,
    community: true,
  },
  YouTube: {
    icon: <YouTubeIcon {...iconClasses(spectrum[8])} fill stroke={0} />,
    href: social.YouTube,
    community: true,
  },
  Support: {
    icon: <HeartIcon {...iconClasses(spectrum[9])} fill stroke={0} />,
    href: '/support',
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
