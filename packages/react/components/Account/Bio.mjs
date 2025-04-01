// Dependencies
import { welcomeSteps } from './shared.mjs'

// Context
import { LoadingStatusContext } from '@freesewing/react/context/LoadingStatus'

// Hooks
import React, { useState, useContext } from 'react'
import { useAccount } from '@freesewing/react/hooks/useAccount'
import { useBackend } from '@freesewing/react/hooks/useBackend'

// Components
import { Link as WebLink } from '@freesewing/react/components/Link'
import { SaveIcon, RightIcon } from '@freesewing/react/components/Icon'
import { MarkdownInput } from '@freesewing/react/components/Input'
import { IconButton } from '@freesewing/react/components/Button'
import { WelcomeIcons } from './shared.mjs'

/*
 * Component for the account/bio page
 *
 * @params {object} props - All React props
 * @params {bool} props.welcome - Set to true to use this component on the welcome page
 * @params {function} props.Link - A framework specific Link component for client-side routing
 */
export const Bio = ({ welcome = false, Link = false }) => {
  if (!Link) Link = WebLink

  // Hooks
  const { account, setAccount } = useAccount()
  const backend = useBackend()
  const { setLoadingStatus } = useContext(LoadingStatusContext)

  // State
  const [bio, setBio] = useState(account.bio)

  // Helper method to save bio
  const save = async () => {
    setLoadingStatus([true, 'Saving bio'])
    const [status, body] = await backend.updateAccount({ bio })
    if (status === 200 && body.result === 'success') {
      setAccount(body.account)
      setLoadingStatus([true, 'Bio updated', true, true])
    } else setLoadingStatus([true, 'Something went wrong. Please report this', true, true])
  }

  // Next step in the onboarding
  const nextHref =
    welcomeSteps[account.control].length > 5
      ? '/welcome/' + welcomeSteps[account.control][6]
      : '/docs/about/guide'

  return (
    <div className="tw-w-full">
      <h6>Tell people a little bit about yourself.</h6>
      <MarkdownInput id="account-bio" label="Bio" update={setBio} current={bio} placeholder="Bio" />
      <p className="tw-text-right">
        <button
          className="tw-daisy-btn tw-daisy-btn-primary tw-w-full lg:tw-w-auto tw-mt-8"
          onClick={save}
        >
          <SaveIcon /> Save Bio
        </button>
      </p>

      {welcome ? (
        <>
          <IconButton href={nextHref} className="tw-mt-4">
            <RightIcon stroke={3} /> Continue
          </IconButton>
          {welcomeSteps[account.control].length > 0 ? (
            <>
              <progress
                className="tw-daisy-progress tw-daisy-progress-primary tw-w-full tw-mt-12"
                value={600 / welcomeSteps[account.control].length}
                max="100"
              ></progress>
              <span className="tw-pt-4 tw-text-sm tw-font-bold tw-opacity-50">
                6 / {welcomeSteps[account.control].length}
              </span>
              <WelcomeIcons
                done={welcomeSteps[account.control].slice(0, 5)}
                todo={welcomeSteps[account.control].slice(6)}
                current="bio"
              />
            </>
          ) : null}
        </>
      ) : null}
    </div>
  )
}
