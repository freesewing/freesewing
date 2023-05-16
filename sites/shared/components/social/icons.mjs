import Link from 'next/link'
import {
  MsfIcon,
  HelpIcon,
  DiscordIcon,
  FacebookIcon,
  GithubIcon,
  InstagramIcon,
  RedditIcon,
  TwitterIcon,
  OpenSourceIcon,
  CcByIcon,
  YouTubeIcon,
} from 'shared/components/icons.mjs'
import { colors } from 'shared/components/wordmark.mjs'

const iconClasses = (i) => ({
  className: `w-8 lg:w-12 h-8 lg:h-12 text-${colors[i]}-400 hover:text-neutral-content`,
})

const social = {
  YouTube: {
    icon: <YouTubeIcon {...iconClasses(0)} fill stroke={0} />,
    href: 'https://www.youtube.com/channel/UCLAyxEL72gHvuKBpa-GmCvQ',
  },
  Discord: {
    icon: <DiscordIcon {...iconClasses(1)} />,
    href: 'https://discord.freesewing.org/',
  },
  Instagram: {
    icon: <InstagramIcon {...iconClasses(2)} />,
    href: 'https://instagram.com/freesewing_org',
  },
  Facebook: {
    icon: <FacebookIcon {...iconClasses(3)} />,
    href: 'https://www.facebook.com/groups/627769821272714/',
  },
  Github: {
    icon: <GithubIcon {...iconClasses(4)} />,
    href: 'https://github.com/freesewing',
  },
  Reddit: {
    icon: <RedditIcon {...iconClasses(5)} />,
    href: 'https://www.reddit.com/r/freesewing/',
  },
  Twitter: {
    icon: <TwitterIcon {...iconClasses(6)} />,
    href: 'https://twitter.com/freesewing_org',
  },
  'Creative Commons content: CC-BY': {
    icon: <CcByIcon {...iconClasses(7)} />,
    href: 'https://creativecommons.org/licenses/by/2.0/',
  },
  'Open Souce License: MIT': {
    icon: <OpenSourceIcon {...iconClasses(8)} />,
    href: 'https://github.com/freesewing/freesewing/blob/develop/LICENSE',
  },
  'Contact Information': {
    icon: <HelpIcon {...iconClasses(9)} />,
    href: '/contact',
  },
}

export const SocialIcons = () =>
  Object.keys(social).map((item) => (
    <Link key={item} href={social[item].href} className="hover:text-secondary" title={item}>
      {social[item].icon}
    </Link>
  ))
