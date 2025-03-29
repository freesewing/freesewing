// Dependencies
import { linkClasses, cloudflareImageUrl, getSearchParam } from '@freesewing/utils'
// Context
import { ModalContext } from '@freesewing/react/context/Modal'
// Hooks
import React, { useState, useEffect, useContext } from 'react'
import { useAccount } from '@freesewing/react/hooks/useAccount'
import { useBackend } from '@freesewing/react/hooks/useBackend'
// Components
import { ModalWrapper } from '@freesewing/react/components/Modal'
import { Link as WebLink } from '@freesewing/react/components/Link'
import { NoIcon, OkIcon, SaveIcon, RightIcon, WarningIcon } from '@freesewing/react/components/Icon'
import { MiniWarning } from '@freesewing/react/components/Mini'
import { KeyVal } from '@freesewing/react/components/KeyVal'
import Markdown from 'react-markdown'

/*
 * Component for the currently authenticated user's profile
 *
 * @params {object} props - All React props
 * @param {number} props.uid - The user ID for which to show the profile
 * @param {function} props.Link - An optional framework-specific Link component
 */
export const OwnProfile = (props) => {
  const { account } = useAccount()

  return <UserProfile uid={account.id} {...props} />
}

/*
 * Component for a user profile
 *
 * @params {object} props - All React props
 * @param {number} props.uid - The user ID for which to show the profile
 * @param {function} props.Link - An optional framework-specific Link component
 */
export const UserProfile = ({
  Link = false,
  setTitle = false,
  uid = false,
  noBox = false,
  fromUrl = false,
}) => {
  if (!uid && !fromUrl)
    return (
      <MiniWarning>
        You must provide either a <code>uid</code> or <code>fromUrl</code> prop
      </MiniWarning>
    )
  if (!Link) Link = WebLink

  const [ruid, setRuid] = useState()

  // Hooks
  const backend = useBackend()

  // State
  const [data, setData] = useState(false)

  // Effect
  useEffect(() => {
    if (uid && uid !== ruid) setRuid(uid)
    if (fromUrl) {
      const urlId = getSearchParam(fromUrl)
      if (urlId && urlId !== ruid) setRuid(urlId)
    }
    if (ruid) loadProfileData(ruid, backend, setData)
  }, [uid, fromUrl, ruid])

  return (
    <>
      <div className="tw-w-full tw-flex tw-flex-row tw-flex-wrap tw-items-center tw-gap-4">
        <Avatar ihash={data.ihash} />
        <div className="tw-flex tw-flex-col tw-items-start tw-gap-1">
          <h2>{data.username}</h2>
          <KeyVal k="role" val={data.role} />
        </div>
      </div>
      <div className="tw-my-4 tw-border-l-4 tw-pl-2">
        <b>Permalink: </b>
        <Link href={`/users?id=${ruid}`}>{`freesewing.eu/users?id=${ruid}`}</Link>
      </div>
      <Markdown>{data.bio}</Markdown>
    </>
  )
}

/*
 * Shows an avatar image
 *
 * @param {string} ihash - The ihash of the account
 */
export const Avatar = ({ ihash }) => {
  const { setModal } = useContext(ModalContext)

  return (
    <button
      onClick={() =>
        setModal(
          <ModalWrapper>
            <img
              src={cloudflareImageUrl({ id: `uid-${ihash}`, variant: 'public' })}
              className="tw-max-w-full tw-max-h-screen"
            />
          </ModalWrapper>
        )
      }
    >
      <img
        src={cloudflareImageUrl({ id: `uid-${ihash}`, variant: 'sq500' })}
        className="tw-w-32 tw-h-32 tw-rounded-full tw-shadow tw-border-current tw-border-4"
      />
    </button>
  )
}

async function loadProfileData(uid, backend, setData) {
  const [status, body] = await backend.getUserProfile(uid)
  if (status === 200 && body.result === 'success' && body.profile) setData(body.profile)
}
