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
import { social } from 'config/social.mjs'

const iconClasses = (i) => ({
  className: `w-8 lg:w-12 h-8 lg:h-12 text-${colors[i]}-400 hover:text-neutral-content`,
})

const socialList = {
  MSF: {
    icon: <MsfIcon {...iconClasses(0)} fill />,
    href: 'https://www.youtube.com/channel/UCLAyxEL72gHvuKBpa-GmCvQ',
  },
  Discord: {
    icon: <DiscordIcon {...iconClasses(1)} />,
    href: social.Discord,
  },
  Instagram: {
    icon: <InstagramIcon {...iconClasses(2)} />,
    href: social.Instagram,
  },
  Facebook: {
    icon: <FacebookIcon {...iconClasses(3)} />,
    href: social.Facebook,
  },
  GitHub: {
    icon: <GithubIcon {...iconClasses(4)} />,
    href: social.GitHub,
  },
  Reddit: {
    icon: <RedditIcon {...iconClasses(5)} />,
    href: social.Reddit,
  },
  Twitter: {
    icon: <TwitterIcon {...iconClasses(6)} />,
    href: social.Twitter,
  },
  YouTube: {
    icon: <YouTubeIcon {...iconClasses(7)} fill stroke={0} />,
    href: social.YouTube,
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
  Object.keys(socialList).map((item) => (
    <Link key={item} href={socialList[item].href} className="hover:text-secondary" title={item}>
      {socialList[item].icon}
    </Link>
  ))
