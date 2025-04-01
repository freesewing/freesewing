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

const btnClasses = 'tw-daisy-btn tw-capitalize tw-flex tw-flex-row tw-justify-between'
const itemClasses =
  'tw-flex tw-flex-row tw-items-center tw-justify-between tw-bg-opacity-10 tw-p-2 tw-px-4 tw-rounded tw-mb-1'
const linkClasses = `hover:tw-bg-secondary hover:tw-bg-opacity-10 tw-max-w-md hover:tw-no-underline`

const titles = {
  apikeys: 'API Keys',
  sets: 'Measurements Sets',
  patterns: 'Patterns',
  img: 'Avatar',
  email: 'E-mail Address',
  newsletter: 'Newsletter Subscription',
  compare: 'Measurements Comparison',
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
        className="tw-w-8 tw-h-8 tw-aspect-square tw-rounded-full shadow"
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
      <NoIcon className="tw-text-base-content tw-w-6 tw-h-6" stroke={2} />
    )

  return (
    <div className="tw-w-full">
      <div className="tw-grid tw-grid-cols-1 xl:tw-grid-cols-2 tw-gap-4 tw-mb-8">
        <div>
          <h4 className="tw-my-2">Your Data</h4>
          {Object.keys(controlConfig.account.fields.data).map((item) =>
            controlConfig.flat[item] > control ? null : (
              <Link
                key={item}
                title={titles[item]}
                href={`/account/data/${item}/`}
                className={`${itemClasses} ${linkClasses}`}
              >
                <div className="tw-flex tw-flex-row tw-items-center tw-gap-3 tw-font-medium">
                  {itemIcons[item]}
                  {titles[item] ? titles[item] : capitalize(item)}
                </div>
                <div>{itemPreviews[item]}</div>
              </Link>
            )
          )}
        </div>

        {control > 1 && (
          <div>
            <h4 className="tw-my-2">About You</h4>
            {Object.keys(controlConfig.account.fields.info).map((item) =>
              controlConfig.flat[item] > control ? null : (
                <Link
                  key={item}
                  title={titles[item] || capitalize(item)}
                  href={`/account/about/${item === 'img' ? 'avatar' : item}/`}
                  className={`${itemClasses} ${linkClasses}`}
                >
                  <div className="tw-flex tw-flex-row tw-items-center tw-gap-3 tw-font-medium">
                    {itemIcons[item]}
                    {titles[item] ? titles[item] : capitalize(item)}
                  </div>
                  <div>{itemPreviews[item]}</div>
                </Link>
              )
            )}
            <div className={`${itemClasses} tw-opacity-60 tw-max-w-md`}>
              <div className="tw-flex tw-flex-row tw-items-center tw-gap-3 tw-font-medium">
                <OkIcon stroke={3} />
                <span>Role</span>
              </div>
              <div className="tw-capitalize">{account.role}</div>
            </div>
            <div className={`${itemClasses} tw-opacity-60 tw-max-w-md`}>
              <div className="tw-flex tw-flex-row tw-items-center tw-gap-3 tw-font-medium">
                <FingerprintIcon />
                <span>ID</span>
              </div>
              <div>{account.id}</div>
            </div>
          </div>
        )}

        <div>
          <h4 className="tw-my-2">Preferences</h4>
          {Object.keys(controlConfig.account.fields.settings).map((item) =>
            controlConfig.flat[item] > control ? null : (
              <Link
                key={item}
                title={titles[item] || capitalize(item)}
                href={`/account/preferences/${item}/`}
                className={`${itemClasses} ${linkClasses}`}
              >
                <div className="tw-flex tw-flex-row tw-items-center tw-gap-3 tw-font-medium">
                  {itemIcons[item]}
                  {titles[item] ? titles[item] : capitalize(item)}
                </div>
                <div>{itemPreviews[item]}</div>
              </Link>
            )
          )}
        </div>

        {control > 2 && (
          <div>
            <h4 className="tw-my-2">Linked Identities</h4>
            {Object.keys(controlConfig.account.fields.identities).map((item) =>
              controlConfig.flat[item] > control ? null : (
                <Link
                  key={item}
                  title={titles[item] || capitalize(item)}
                  href={`/account/social/${item}/`}
                  className={`${itemClasses} ${linkClasses}`}
                >
                  <div className="tw-flex tw-flex-row tw-items-center tw-gap-3 tw-font-medium">
                    {itemIcons[item]}
                    {titles[item] ? titles[item] : capitalize(item)}
                  </div>
                  <div>{itemPreviews[item]}</div>
                </Link>
              )
            )}
          </div>
        )}

        {control > 1 && (
          <div>
            <h4 className="tw-my-2">Security</h4>
            {Object.keys(controlConfig.account.fields.security).map((item) =>
              controlConfig.flat[item] > control ? null : (
                <Link
                  key={item}
                  title={titles[item] || capitalize(item)}
                  href={`/account/security/${item}/`}
                  className={`${itemClasses} ${linkClasses}`}
                >
                  <div className="tw-flex tw-flex-row tw-items-center tw-gap-3 tw-font-medium">
                    {itemIcons[item]}
                    {titles[item] ? titles[item] : capitalize(item)}
                  </div>
                  <div>{itemPreviews[item]}</div>
                </Link>
              )
            )}
          </div>
        )}

        {control > 1 && (
          <div>
            <h4 className="tw-my-2">Actions</h4>
            {control > 2 && (
              <Link
                className={`${itemClasses} ${linkClasses}`}
                title="Import data"
                href="/account/actions/import/"
              >
                <UploadIcon />
                <span className="tw-font-medium">Import data</span>
              </Link>
            )}
            {control > 2 && (
              <Link
                className={`${itemClasses} ${linkClasses}`}
                title="Export your data"
                href="/account/actions/export/"
              >
                <DownloadIcon />
                <span className="tw-font-medium">Export your data</span>
              </Link>
            )}
            {control > 2 && (
              <Link
                className={`${itemClasses} ${linkClasses}`}
                title="Reload account data"
                href="/account/actions/reload/"
              >
                <ReloadIcon />
                <span className="tw-font-medium">Reload account data</span>
              </Link>
            )}
            {control > 3 && (
              <Link
                className={`${itemClasses} ${linkClasses}`}
                title="Restrict processing of your data"
                href="/account/actions/restrict/"
              >
                <CloseIcon className="tw-w-6 tw-h-6 tw-text-warning" stroke={3} />
                <span className="tw-font-medium">Restrict processing of your data</span>
              </Link>
            )}
            <Link
              className={`${itemClasses} ${linkClasses}`}
              title="Remove your account"
              href="/account/actions/remove/"
            >
              <TrashIcon className="tw-w-6 tw-h-6 tw-text-warning" />
              <span className="tw-font-medium">Remove your account</span>
            </Link>
          </div>
        )}
      </div>

      <div className="tw-flex tw-flex-row tw-flex-wrap tw-gap-2 md:tw-gap-4 tw-justify-end">
        {account.role === 'admin' && (
          <Link className={`${btnClasses} tw-daisy-btn-accent md:tw-w-64`} href="/admin">
            <WrenchIcon />
            Administration
          </Link>
        )}
        {control > 1 && (
          <Link className={`${btnClasses} tw-daisy-btn-secondary md:tw-w-64`} href="/profile">
            <UserIcon />
            Your Profile
          </Link>
        )}
        <button
          className={`${btnClasses} tw-daisy-btn-neutral md:tw-w-64`}
          onClick={() => signOut()}
        >
          <SignoutIcon />
          Sign Out
        </button>
      </div>
    </div>
  )
}
