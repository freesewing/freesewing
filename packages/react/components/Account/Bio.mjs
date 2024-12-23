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
import { SaveIcon } from '@freesewing/react/components/Icon'
import { MarkdownInput } from '@freesewing/react/components/Input'

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
    <div className="w-full">
      <h6>Tell people a little bit about yourself.</h6>
      <MarkdownInput id="account-bio" label="Bio" update={setBio} current={bio} placeholder="Bio" />
      <p className="text-right">
        <button className="daisy-btn daisy-btn-primary w-full lg:w-auto mt-8" onClick={save}>
          <SaveIcon /> Save Bio
        </button>
      </p>

      {welcome ? (
        <>
          <ContinueButton btnProps={{ href: nextHref }} link />
          {welcomeSteps[account.control].length > 0 ? (
            <>
              <progress
                className="progress progress-primary w-full mt-12"
                value={600 / welcomeSteps[account.control].length}
                max="100"
              ></progress>
              <span className="pt-4 text-sm font-bold opacity-50">
                6 / {welcomeSteps[account.control].length}
              </span>
              <Icons
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
