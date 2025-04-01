// Context
import { LoadingStatusContext } from '@freesewing/react/context/LoadingStatus'

// Hooks
import React, { useState, useContext } from 'react'
import { useAccount } from '@freesewing/react/hooks/useAccount'
import { useBackend } from '@freesewing/react/hooks/useBackend'

// Components
import { SaveIcon } from '@freesewing/react/components/Icon'
import { StringInput } from '@freesewing/react/components/Input'

const labels = {
  instagram: 'Instagram',
  mastodon: 'Mastodon',
  reddit: 'Reddit',
  twitch: 'Twitch',
  tiktok: 'TikTok',
  website: 'Website',
}

export const Instagram = () => <Platform platform="instagram" />
export const Mastodon = () => <Platform platform="mastodon" />
export const Reddit = () => <Platform platform="reddit" />
export const Twitch = () => <Platform platform="twitch" />
export const Tiktok = () => <Platform platform="tiktok" />
export const Website = () => <Platform platform="website" />

/*
 * Component for the account/social/[platform] page
 *
 * @param {object} props - All React props
 * @param {string} platform - One of the keys in the labels object above
 */
const Platform = ({ platform = false }) => {
  // Hooks
  const { account, setAccount } = useAccount()
  const backend = useBackend()
  const { setLoadingStatus } = useContext(LoadingStatusContext)

  // State
  const [platformId, setPlatformId] = useState(account.data[platform] || '')

  if (!labels || !labels[platform]) return <p>Not a supported platform</p>

  // Helper method to save changes
  const save = async () => {
    setLoadingStatus([true, 'Saving linked identity'])
    const data = { data: {} }
    data.data[platform] = platformId
    const [status, body] = await backend.updateAccount(data)
    if (status === 200 && body.result === 'success') {
      setAccount(body.account)
      setLoadingStatus([true, `Saved your ${labels[platform]} info`, true, true])
    } else setLoadingStatus([true, 'Something went wrong. Please report this', true, true])
  }

  return (
    <div className="tw-w-full">
      <StringInput
        id={`account-${platform}`}
        label={platform === 'website' ? `Website URL` : `${labels[platform]} account`}
        current={platformId}
        update={setPlatformId}
        valid={(val) => val.length > 0}
        placeholder={'joostdecock'}
      />
      <p className="tw-text-right">
        <button
          className="tw-daisy-btn tw-daisy-btn-primary tw-w-full lg:tw-w-auto tw-mt-8"
          onClick={save}
        >
          <SaveIcon /> Save
        </button>
      </p>
    </div>
  )
}
