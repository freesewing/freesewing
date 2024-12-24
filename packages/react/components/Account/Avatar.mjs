// Dependencies
import { welcomeSteps } from './shared.mjs'
import { cloudflareImageUrl } from '@freesewing/utils'

// Context
import { LoadingStatusContext } from '@freesewing/react/context/LoadingStatus'

// Hooks
import React, { useState, useContext } from 'react'
import { useAccount } from '@freesewing/react/hooks/useAccount'
import { useBackend } from '@freesewing/react/hooks/useBackend'

// Components
import { Link as WebLink } from '@freesewing/react/components/Link'
import { SaveIcon, RightIcon } from '@freesewing/react/components/Icon'
import { PassiveImageInput } from '@freesewing/react/components/Input'
import { IconButton } from '@freesewing/react/components/Button'
import { WelcomeIcons } from './shared.mjs'

/*
 * Component for the account/bio page
 *
 * @params {object} props - All React props
 * @params {bool} props.welcome - Set to true to use this component on the welcome page
 * @params {function} props.Link - A framework specific Link component for client-side routing
 */
export const Avatar = ({ welcome = false, Link = false }) => {
  if (!Link) Link = WebLink

  // Hooks
  const { account, setAccount } = useAccount()
  const backend = useBackend()

  // State
  const [img, setImg] = useState('')

  // Context
  const { setLoadingStatus } = useContext(LoadingStatusContext)

  // Save handler
  const save = async () => {
    setLoadingStatus([true, 'Uploading image'])
    const [status, body] = await backend.updateAccount({ img })
    if (status === 200 && body.result === 'success') {
      setAccount(body.account)
      setLoadingStatus([true, 'Avatar saved', true, true])
    } else setLoadingStatus([true, 'Failed to save avatar image. Please report this', true, false])
  }

  // Next page in welcome flow
  const nextHref = '/docs/about/guide'

  return (
    <div className="w-full">
      {!welcome || img !== false ? (
        <img
          alt="img"
          src={img || cloudflareImageUrl({ id: `uid-${account.ihash}`, variant: 'public' })}
          className="shadow mb-4"
        />
      ) : null}
      <PassiveImageInput
        id="account-img"
        label="Avatar image"
        placeholder={'image'}
        update={setImg}
        current={img}
        valid={(val) => val.length > 0}
      />
      {welcome ? (
        <>
          <IconButton onClick={save} btnProps={{ disabled: !img }}>
            <SaveIcon />
            Save
          </IconButton>
          <IconButton href={nextHref} className="mt-4">
            <RightIcon stroke={3} /> Continue
          </IconButton>
          {welcomeSteps[account.control].length > 0 ? (
            <>
              <progress
                className="progress progress-primary w-full mt-12"
                value={700 / welcomeSteps[account.control].length}
                max="100"
              ></progress>
              <span className="pt-4 text-sm font-bold opacity-50">
                7 / {welcomeSteps[account.control].length}
              </span>
              <WelcomeIcons
                done={welcomeSteps[account.control].slice(0, 6)}
                todo={welcomeSteps[account.control].slice(7)}
                current="img"
              />
            </>
          ) : null}
        </>
      ) : (
        <>
          <p className="text-right">
            <button className="daisy-btn daisy-btn-primary w-full lg:w-auto mt-8" onClick={save}>
              <SaveIcon /> Save Avatar
            </button>
          </p>
        </>
      )}
    </div>
  )
}
