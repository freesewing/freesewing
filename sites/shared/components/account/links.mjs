import { useState, useEffect } from 'react'
import { useAccount } from 'shared/hooks/use-account.mjs'
import { useBackend } from 'shared/hooks/use-backend.mjs'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { freeSewingConfig as conf, controlLevels } from 'shared/config/freesewing.config.mjs'
import {
  MsetIcon,
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
  CloseIcon,
  ReloadIcon,
  NoIcon,
  PatternIcon,
  BoolYesIcon,
  BoolNoIcon,
  OkIcon,
  WrenchIcon,
  UploadIcon,
  DownloadIcon,
} from 'shared/components/icons.mjs'
import { cloudflareImageUrl, capitalize } from 'shared/utils.mjs'
import { ControlScore } from 'shared/components/control/score.mjs'

export const ns = ['account', 'i18n']

const itemIcons = {
  bookmarks: <BookmarkIcon />,
  sets: <MsetIcon />,
  patterns: <PatternIcon />,
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
    className={`${itemClasses} hover:bg-secondary hover:bg-opacity-10 max-w-md`}
    href={href}
    title={title}
  >
    {children}
  </Link>
)

const YesNo = ({ check }) => (check ? <BoolYesIcon /> : <BoolNoIcon />)

export const AccountLinks = () => {
  const { account, signOut, control } = useAccount()
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

  const btnClasses = 'btn capitalize flex flex-row justify-between'

  if (!account.username) return null

  const itemPreviews = {
    apikeys: apikeys?.length || 0,
    bookmarks: bookmarks?.length || 0,
    sets: sets?.length || 0,
    patterns: patterns?.length || 0,
    username: account.username,
    email: account.email,
    bio: account.bio ? <span>{account.bio.slice(0, 15)}&hellip;</span> : '',
    img: (
      <img
        src={cloudflareImageUrl({ type: 'sq100', id: `uid-${account.ihash}` })}
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
    password: account.passwordType === 'v3' ? <BoolYesIcon /> : <NoIcon />,
    mfa: <YesNo check={account.mfaEnabled} />,
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
          {Object.keys(conf.account.fields.data).map((item) =>
            controlLevels[item] > control ? null : (
              <AccountLink href={`/account/${item}`} title={t(item)} key={item}>
                <div className="flex flex-row items-center gap-3 font-medium">
                  {itemIcons[item]}
                  {t(`your${capitalize(item)}`)}
                </div>
                <div className="">{itemPreviews[item]}</div>
              </AccountLink>
            )
          )}
        </div>

        {control > 1 && (
          <div className="">
            <h4 className="my-2">{t('info')}</h4>
            {Object.keys(conf.account.fields.info).map((item) =>
              controlLevels[item] > control ? null : (
                <AccountLink href={`/account/${item}`} title={t(item)} key={item}>
                  <div className="flex flex-row items-center gap-3 font-medium">
                    {itemIcons[item]}
                    {t(item)}
                  </div>
                  <div className="">{itemPreviews[item]}</div>
                </AccountLink>
              )
            )}
            <div className={`${itemClasses} bg-neutral max-w-md`}>
              <div className="flex flex-row items-center gap-3 font-medium">
                <OkIcon stroke={3} />
                <span>{t('account:role')}</span>
              </div>
              <div className="">{account.role}</div>
            </div>
            <div className={`${itemClasses} bg-neutral max-w-md`}>
              <div className="flex flex-row items-center gap-3 font-medium">
                <FingerprintIcon />
                <span>ID</span>
              </div>
              <div className="">{account.id}</div>
            </div>
          </div>
        )}

        <div className="">
          <h4 className="my-2">{t('settings')}</h4>
          {Object.keys(conf.account.fields.settings).map((item) =>
            controlLevels[item] > control ? null : (
              <AccountLink href={`/account/${item}`} title={t(item)} key={item}>
                <div className="flex flex-row items-center gap-3 font-medium">
                  {itemIcons[item]}
                  {t(item)}
                </div>
                <div className="">{itemPreviews[item]}</div>
              </AccountLink>
            )
          )}
        </div>

        {control > 2 && (
          <div className="">
            <h4 className="my-2">{t('linkedIdentities')}</h4>
            {Object.keys(conf.account.fields.identities).map((item) =>
              controlLevels[item] > control ? null : (
                <AccountLink href={`/account/${item}`} title={t(item)} key={item}>
                  <div className="flex flex-row items-center gap-3 font-medium">
                    {itemIcons[item]}
                    {t(item)}
                  </div>
                  <div className="">{itemPreviews[item]}</div>
                </AccountLink>
              )
            )}
          </div>
        )}

        {control > 1 && (
          <div className="">
            <h4 className="my-2">{t('security')}</h4>
            {Object.keys(conf.account.fields.security).map((item) =>
              controlLevels[item] > control ? null : (
                <AccountLink href={`/account/${item}`} title={t(item)} key={item}>
                  <div className="flex flex-row items-center gap-3 font-medium">
                    {itemIcons[item]}
                    {t(item)}
                  </div>
                  <div className="">{itemPreviews[item]}</div>
                </AccountLink>
              )
            )}
          </div>
        )}

        {control > 1 && (
          <div className="">
            <h4 className="my-2">{t('actions')}</h4>
            {control > 2 && (
              <AccountLink href={`/account/import`} title={t('import')}>
                <UploadIcon />
                {t('import')}
              </AccountLink>
            )}
            {control > 2 && (
              <AccountLink href={`/account/export`} title={t('export')}>
                <DownloadIcon />
                {t('export')}
              </AccountLink>
            )}
            {control > 2 && (
              <AccountLink href={`/account/reload`} title={t('reload')}>
                <ReloadIcon />
                {t('reload')}
              </AccountLink>
            )}
            {control > 3 && (
              <AccountLink href={`/account/restrict`} title={t('restrict')}>
                <CloseIcon />
                {t('restrict')}
              </AccountLink>
            )}
            <AccountLink href={`/account/remove`} title={t('remove')}>
              <TrashIcon />
              {t('remove')}
            </AccountLink>
          </div>
        )}
      </div>

      <div className="flex flex-row flex-wrap gap-2 md:gap-4 justify-end">
        {account.role === 'admin' && (
          <Link className={`${btnClasses} btn-accent md:w-64 w-full`} href="/admin">
            <WrenchIcon />
            Administration
          </Link>
        )}
        {control > 1 && (
          <Link className={`${btnClasses} btn-secondary md:w-64 w-full`} href="/profile">
            <UserIcon />
            {t('yourProfile')}
          </Link>
        )}
        <button className={`${btnClasses} btn-neutral md:w-64 w-full`} onClick={() => signOut()}>
          <SignoutIcon />
          {t('signOut')}
        </button>
      </div>
    </div>
  )
}
