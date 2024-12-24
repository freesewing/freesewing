// Config
import { cloudflareImageUrl, capitalize } from '@freesewing/utils'
import { control as controlConfig } from '@freesewing/config'
// Hooks
import React, { useState, useEffect } from 'react'
import { useAccount } from '@freesewing/react/hooks/useAccount'
import { useBackend } from '@freesewing/react/hooks/useBackend'
// Components
import { Link as DefautLink } from '@freesewing/react/components/Link'
import { ControlScore } from '@freesewing/react/components/Control'
import {
  MeasurementsSetIcon,
  SignoutIcon,
  UserIcon,
  UnitsIcon,
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
} from '@freesewing/react/components/Icon'

const itemIcons = {
  bookmarks: <BookmarkIcon />,
  sets: <MeasurementsSetIcon />,
  patterns: <PatternIcon />,
  apikeys: <KeyIcon />,
  username: <UserIcon />,
  email: <EmailIcon />,
  bio: <ChatIcon />,
  img: <ShowcaseIcon />,
  language: <ShowcaseIcon />,
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
  twitter: <InstagramIcon />,
  twitch: <TwitchIcon />,
  tiktok: <TikTokIcon />,
  website: <LinkIcon />,
  reddit: <RedditIcon />,
}

const btnClasses = 'daisy-btn capitalize flex flex-row justify-between'
const itemClasses = 'flex flex-row items-center justify-between bg-opacity-10 p-2 px-4 rounded mb-1'
const linkClasses = `hover:bg-secondary hover:bg-opacity-10 max-w-md hover:no-underline`

const titles = {
  apikeys: 'API Keys',
  sets: 'Measurements Sets',
  patterns: 'Patterns',
  img: 'Avatar',
  email: 'E-mail Address',
  newsletter: 'Newsletter Subscription',
  compare: 'Measurements Sets Comparison',
  consent: 'Consent & Privacy',
  control: 'User Experience',
  github: 'GitHub',
  mfa: 'Multi-Factor Authentication',
}

const YesNo = ({ check }) => (check ? <BoolYesIcon /> : <BoolNoIcon />)

const t = (input) => input

/**
 * The Links component shows all of the links to manage your account
 *
 * @param {object} props - All the React props
 * @param {function} Link - A custom Link component, typically the Docusaurus one, but it's optional
 */
export const Links = ({ Link = false }) => {
  // Use custom Link component if available
  if (!Link) Link = DefaultLink

  // Hooks
  const { account, signOut, control } = useAccount()
  const backend = useBackend()

  // State
  const [bookmarks, setBookmarks] = useState([])
  const [sets, setSets] = useState([])
  const [patterns, setPatterns] = useState([])
  const [apikeys, setApikeys] = useState([])

  // Effects
  useEffect(() => {
    const getUserData = async () => {
      const [status, body] = await backend.getUserData(account.id)
      if (status === 200 && body.result === 'success') {
        setApikeys(body.data.apikeys)
        setBookmarks(body.data.bookmarks)
        setPatterns(body.data.patterns)
        setSets(body.data.sets)
      }
    }
    getUserData()
  }, [account.id])

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
    units: account.imperial ? 'Imperial' : 'Metric',
    newsletter: <YesNo check={account.newsletter} />,
    compare: <YesNo check={account.compare} />,
    consent: <YesNo check={account.consent} />,
    control: <ControlScore control={account.control} />,
    github: account.data.githubUsername || account.data.githubEmail || <NoIcon />,
    password: account.passwordType === 'v3' ? <BoolYesIcon /> : <NoIcon />,
    mfa: <YesNo check={account.mfaEnabled} />,
  }
  for (const social of Object.keys(controlConfig.account.fields.identities).filter(
    (i) => i !== 'github'
  ))
    itemPreviews[social] = account.data[social] || (
      <NoIcon className="text-base-content w-6 h-6" stroke={2} />
    )

  return (
    <div className="w-full max-w-7xl">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-8">
        <div className="">
          <h4 className="my-2">Your Data</h4>
          {Object.keys(controlConfig.account.fields.data).map((item) =>
            controlConfig.flat[item] > control ? null : (
              <Link
                key={item}
                title={titles[item]}
                href={`/account/data/${item}/`}
                className={`${itemClasses} ${linkClasses}`}
              >
                <div className="flex flex-row items-center gap-3 font-medium">
                  {itemIcons[item]}
                  {titles[item] ? titles[item] : capitalize(item)}
                </div>
                <div className="">{itemPreviews[item]}</div>
              </Link>
            )
          )}
        </div>

        {control > 1 && (
          <div className="">
            <h4 className="my-2">About You</h4>
            {Object.keys(controlConfig.account.fields.info).map((item) =>
              controlConfig.flat[item] > control ? null : (
                <Link
                  key={item}
                  title={titles[item] || capitalize(item)}
                  href={`/account/about/${item}/`}
                  className={`${itemClasses} ${linkClasses}`}
                >
                  <div className="flex flex-row items-center gap-3 font-medium">
                    {itemIcons[item]}
                    {titles[item] ? titles[item] : capitalize(item)}
                  </div>
                  <div className="">{itemPreviews[item]}</div>
                </Link>
              )
            )}
            <div className={`${itemClasses} opacity-60 max-w-md`}>
              <div className="flex flex-row items-center gap-3 font-medium">
                <OkIcon stroke={3} />
                <span>Role</span>
              </div>
              <div className="capitalize">{account.role}</div>
            </div>
            <div className={`${itemClasses} opacity-60 max-w-md`}>
              <div className="flex flex-row items-center gap-3 font-medium">
                <FingerprintIcon />
                <span>ID</span>
              </div>
              <div className="">{account.id}</div>
            </div>
          </div>
        )}

        <div className="">
          <h4 className="my-2">Preferences</h4>
          {Object.keys(controlConfig.account.fields.settings).map((item) =>
            controlConfig.flat[item] > control ? null : (
              <Link
                key={item}
                title={titles[item] || capitalize(item)}
                href={`/account/preferences/${item}/`}
                className={`${itemClasses} ${linkClasses}`}
              >
                <div className="flex flex-row items-center gap-3 font-medium">
                  {itemIcons[item]}
                  {titles[item] ? titles[item] : capitalize(item)}
                </div>
                <div className="">{itemPreviews[item]}</div>
              </Link>
            )
          )}
        </div>

        {control > 2 && (
          <div className="">
            <h4 className="my-2">Linked Identities</h4>
            {Object.keys(controlConfig.account.fields.identities).map((item) =>
              controlConfig.flat[item] > control ? null : (
                <Link
                  key={item}
                  title={titles[item] || capitalize(item)}
                  href={`/account/social/${item}/`}
                  className={`${itemClasses} ${linkClasses}`}
                >
                  <div className="flex flex-row items-center gap-3 font-medium">
                    {itemIcons[item]}
                    {titles[item] ? titles[item] : capitalize(item)}
                  </div>
                  <div className="">{itemPreviews[item]}</div>
                </Link>
              )
            )}
          </div>
        )}

        {control > 1 && (
          <div className="">
            <h4 className="my-2">Security</h4>
            {Object.keys(controlConfig.account.fields.security).map((item) =>
              controlConfig.flat[item] > control ? null : (
                <Link
                  key={item}
                  title={titles[item] || capitalize(item)}
                  href={`/account/security/${item}/`}
                  className={`${itemClasses} ${linkClasses}`}
                >
                  <div className="flex flex-row items-center gap-3 font-medium">
                    {itemIcons[item]}
                    {titles[item] ? titles[item] : capitalize(item)}
                  </div>
                  <div className="">{itemPreviews[item]}</div>
                </Link>
              )
            )}
          </div>
        )}

        {control > 1 && (
          <div className="">
            <h4 className="my-2">Actions</h4>
            {control > 2 && (
              <Link
                className={`${itemClasses} ${linkClasses}`}
                title="Import data"
                href="/account/actions/import/"
              >
                <UploadIcon />
                <span className="font-medium">Import data</span>
              </Link>
            )}
            {control > 2 && (
              <Link
                className={`${itemClasses} ${linkClasses}`}
                title="Export your data"
                href="/account/actions/export/"
              >
                <DownloadIcon />
                <span className="font-medium">Export your data</span>
              </Link>
            )}
            {control > 2 && (
              <Link
                className={`${itemClasses} ${linkClasses}`}
                title="Reload account data"
                href="/account/actions/reload/"
              >
                <ReloadIcon />
                <span className="font-medium">Reload account data</span>
              </Link>
            )}
            {control > 3 && (
              <Link
                className={`${itemClasses} ${linkClasses}`}
                title="Restrict processing of your data"
                href="/account/actions/restrict/"
              >
                <CloseIcon className="w-6 h-6 text-warning" stroke={3} />
                <span className="font-medium">Restrict processing of your data</span>
              </Link>
            )}
            <Link
              className={`${itemClasses} ${linkClasses}`}
              title="Remove your account"
              href="/account/actions/remove/"
            >
              <TrashIcon className="w-6 h-6 text-warning" />
              <span className="font-medium">Remove your account</span>
            </Link>
          </div>
        )}
      </div>

      <div className="flex flex-row flex-wrap gap-2 md:gap-4 justify-end">
        {account.role === 'admin' && (
          <Link className={`${btnClasses} daisy-btn-accent md:w-64 w-full`} href="/admin">
            <WrenchIcon />
            Administration
          </Link>
        )}
        {control > 1 && (
          <Link className={`${btnClasses} daisy-btn-secondary md:w-64 w-full`} href="/profile">
            <UserIcon />
            {t('yourProfile')}
          </Link>
        )}
        <button
          className={`${btnClasses} daisy-btn-neutral md:w-64 w-full`}
          onClick={() => signOut()}
        >
          <SignoutIcon />
          {t('signOut')}
        </button>
      </div>
    </div>
  )
}
