import { useState, useEffect } from 'react'
import { useAccount } from 'shared/hooks/use-account.mjs'
import { useBackend } from 'shared/hooks/use-backend.mjs'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { PageLink } from 'shared/components/page-link.mjs'
import { freeSewingConfig as conf } from 'shared/config/freesewing.config.mjs'
import {
  DesignIcon,
  MeasieIcon,
  SignoutIcon,
  UserIcon,
  UnitsIcon,
  I18nIcon,
  ShowcaseIcon,
  ChatIcon,
  EmailIcon,
  KeyIcon,
  BookmarkIcon,
  CompareIcon,
  PrivacyIcon,
  ControlIcon,
  LockIcon,
  NewsletterIcon,
  ShieldIcon,
  FingerprintIcon,
  GitHubIcon,
  InstagramIcon,
  MastodonIcon,
  TwitterIcon,
  TwitchIcon,
  TikTokIcon,
  LinkIcon,
  TrashIcon,
  RedditIcon,
  ExportIcon,
  CloseIcon,
  ReloadIcon,
  OkIcon,
  NoIcon,
} from 'shared/components/icons.mjs'
import { cloudflareImageUrl, capitalize } from 'shared/utils.mjs'
import { ControlScore } from 'shared/components/control/score.mjs'

export const ns = ['account', 'i18n']

const actions = {
  reload: 4,
  export: 3,
  restrict: 4,
  disable: 4,
  remove: 2,
}

const itemIcons = {
  bookmarks: <BookmarkIcon />,
  sets: <MeasieIcon />,
  patterns: <DesignIcon />,
  apikeys: <KeyIcon />,
  username: <UserIcon />,
  email: <EmailIcon />,
  bio: <ChatIcon />,
  img: <ShowcaseIcon />,
  language: <I18nIcon />,
  units: <UnitsIcon />,
  compare: <CompareIcon />,
  consent: <PrivacyIcon />,
  control: <ControlIcon />,
  mfa: <ShieldIcon />,
  newsletter: <NewsletterIcon />,
  password: <LockIcon />,
  github: <GitHubIcon />,
  instagram: <InstagramIcon />,
  mastodon: <MastodonIcon />,
  twitter: <TwitterIcon />,
  twitch: <TwitchIcon />,
  tiktok: <TikTokIcon />,
  website: <LinkIcon />,
  reddit: <RedditIcon />,
}

const itemClasses = 'flex flex-row items-center justify-between bg-opacity-10 p-2 px-4 rounded mb-1'

const AccountLink = ({ href, title, children }) => (
  <Link
    className={`${itemClasses} bg-secondary hover:bg-opacity-100 hover:text-neutral-content`}
    href={href}
    title={title}
  >
    {children}
  </Link>
)

const YesNo = ({ check }) =>
  check ? (
    <OkIcon className="text-success w-6 h-6" stroke={4} />
  ) : (
    <NoIcon className="text-error w-6 h-6" stroke={3} />
  )

export const AccountLinks = () => {
  const { account, signOut } = useAccount()
  const { t } = useTranslation(ns)
  const backend = useBackend()

  const [bookmarks, setBookmarks] = useState([])
  const [sets, setSets] = useState([])
  const [patterns, setPatterns] = useState([])
  const [apikeys, setApikeys] = useState([])

  useEffect(() => {
    const getUserData = async () => {
      const result = await backend.getUserData(account.id)
      if (result.success) {
        setApikeys(result.data.data.apikeys)
        setBookmarks(result.data.data.bookmarks)
        setPatterns(result.data.data.patterns)
        setSets(result.data.data.sets)
      }
    }
    getUserData()
  }, [account.id])

  const lprops = { t, control: account.control }
  const btnClasses = 'btn capitalize flex flex-row justify-between'
  const linkClasses = 'flex flex-row gap-2 text-lg py-2 items-center font-medium capitalize'

  const itemPreviews = {
    apikeys: apikeys?.length || 0,
    bookmarks: bookmarks?.length || 0,
    sets: sets?.length || 0,
    patterns: patterns?.length || 0,
    username: account.username,
    email: account.email,
    bio: <span>{account.bio.slice(0, 15)}&hellip;</span>,
    img: (
      <img
        src={cloudflareImageUrl({ type: 'sq100', id: `user-${account.ihash}` })}
        className="w-8 h-8 aspect-square rounded-full shadow"
      />
    ),
    language: t(`i18n:${account.language}`),
    units: t(account.imperial ? 'imperialUnits' : 'metricUnits'),
    newsletter: <YesNo check={account.newsletter} />,
    compare: <YesNo check={account.compare} />,
    consent: <YesNo check={account.consent} />,
    control: <ControlScore control={account.control} />,
    github: account.data.githubUsername || account.data.githubEmail || <NoIcon />,
    password:
      account.passwordType === 'v3' ? (
        <OkIcon className="text-success w-6 h-6" stroke={4} />
      ) : (
        <NoIcon />
      ),
    mfa: <YesNo check={false} />,
  }

  for (const social of Object.keys(conf.account.fields.identities).filter((i) => i !== 'github'))
    itemPreviews[social] = account.data[social] || (
      <NoIcon className="text-base-content w-6 h-6" stroke={2} />
    )

  return (
    <div className="w-full max-w-7xl">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-8">
        <div className="">
          <h4 className="my-2">{t('data')}</h4>
          {Object.keys(conf.account.fields.data).map((item) => (
            <AccountLink href={`/account/${item}`} title={t(item)}>
              <div className="flex flex-row items-center gap-3 font-medium">
                {itemIcons[item]}
                {t(`your${capitalize(item)}`)}
              </div>
              <div className="">{itemPreviews[item]}</div>
            </AccountLink>
          ))}
        </div>

        <div className="">
          <h4 className="my-2">{t('info')}</h4>
          {Object.keys(conf.account.fields.info).map((item) => (
            <AccountLink href={`/account/${item}`} title={t(item)}>
              <div className="flex flex-row items-center gap-3 font-medium">
                {itemIcons[item]}
                {t(item)}
              </div>
              <div className="">{itemPreviews[item]}</div>
            </AccountLink>
          ))}
          <div className={`${itemClasses} bg-neutral`}>
            <div className="flex flex-row items-center gap-3 font-medium">
              <FingerprintIcon />
              <span>{t('userId')}</span>
            </div>
            <div className="">{account.id}</div>
          </div>
        </div>

        <div className="">
          <h4 className="my-2">{t('settings')}</h4>
          {Object.keys(conf.account.fields.settings).map((item) => (
            <AccountLink href={`/account/${item}`} title={t(item)}>
              <div className="flex flex-row items-center gap-3 font-medium">
                {itemIcons[item]}
                {t(item)}
              </div>
              <div className="">{itemPreviews[item]}</div>
            </AccountLink>
          ))}
        </div>

        <div className="">
          <h4 className="my-2">{t('linkedIdentities')}</h4>
          {Object.keys(conf.account.fields.identities).map((item) => (
            <AccountLink href={`/account/identities/${item}`} title={t(item)}>
              <div className="flex flex-row items-center gap-3 font-medium">
                {itemIcons[item]}
                {t(item)}
              </div>
              <div className="">{itemPreviews[item]}</div>
            </AccountLink>
          ))}
        </div>

        <div className="">
          <h4 className="my-2">{t('security')}</h4>
          {Object.keys(conf.account.fields.security).map((item) => (
            <AccountLink href={`/account/${item}`} title={t(item)}>
              <div className="flex flex-row items-center gap-3 font-medium">
                {itemIcons[item]}
                {t(item)}
              </div>
              <div className="">{itemPreviews[item]}</div>
            </AccountLink>
          ))}
        </div>

        <div className="">
          <h4 className="my-2">{t('actions')}</h4>
          <AccountLink href={`/account/reload`} title={t('reload')}>
            <ReloadIcon />
            {t('reload')}
          </AccountLink>
          <AccountLink href={`/account/export`} title={t('export')}>
            <ExportIcon />
            {t('export')}
          </AccountLink>
          <AccountLink href={`/account/restrict`} title={t('restrict')}>
            <CloseIcon />
            {t('restrict')}
          </AccountLink>
          <AccountLink href={`/account/remove`} title={t('remove')}>
            <TrashIcon />
            {t('remove')}
          </AccountLink>
        </div>
      </div>

      <div className="flex flex-row gap-4 justify-end">
        <Link className={`${btnClasses} btn-primary w-64`} href="/profile">
          <UserIcon />
          {t('yourProfile')}
        </Link>
        <button className={`${btnClasses} btn-warning w-64`} onClick={() => signOut()}>
          <SignoutIcon />
          {t('signOut')}
        </button>
      </div>
    </div>
  )
}
