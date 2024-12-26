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
import { NoIcon, OkIcon, SaveIcon, RightIcon } from '@freesewing/react/components/Icon'
import { StringInput } from '@freesewing/react/components/Input'
import { IconButton } from '@freesewing/react/components/Button'
import { WelcomeIcons } from './shared.mjs'

/*
 * Component for the account/username page
 *
 * @params {object} props - All React props
 * @params {bool} props.welcome - Set to true to use this component on the welcome page
 * @params {function} props.Link - A framework specific Link component for client-side routing
 */
export const Username = ({ welcome = false, Link = false }) => {
  if (!Link) Link = WebLink

  // Hooks
  const { account, setAccount } = useAccount()
  const backend = useBackend()
  const { setLoadingStatus } = useContext(LoadingStatusContext)
  const [username, setUsername] = useState(account.username)
  const [available, setAvailable] = useState(true)

  const update = async (value) => {
    if (value !== username) {
      setUsername(value)
      const result = await backend.isUsernameAvailable(value)
      setAvailable(result.available ? true : false)
    }
  }

  const save = async () => {
    setLoadingStatus([true, 'Saving username'])
    const [status, body] = await backend.updateAccount({ username })
    if (status === 200 && body.result === 'success') {
      setAccount(body.account)
      setLoadingStatus([true, 'Username updated', true, true])
    } else setLoadingStatus([true, 'Something went wrong. Please report this', true, true])
  }

  const nextHref =
    welcomeSteps[account.control].length > 5
      ? '/welcome/' + welcomeSteps[account.control][5]
      : '/docs/about/guide'

  let btnClasses = 'daisy-btn mt-4 capitalize '
  if (welcome) btnClasses += 'w-64 daisy-btn-secondary'
  else btnClasses += 'w-full daisy-btn-primary'

  return (
    <div className="tw-w-full">
      <StringInput
        id="account-username"
        label="Username"
        current={username}
        update={update}
        valid={() => available}
        placeholder={'Sorcha Ni Dhubghaill'}
        labelBL={
          <span className="tw-flex tw-flex-row tw-gap-1 tw-items-center">
            {available ? (
              <>
                <OkIcon className="tw-w-4 tw-h-4 tw-text-success" stroke={4} /> Username is
                available
              </>
            ) : (
              <>
                <NoIcon className="tw-w-4 tw-h-4 tw-text-error" stroke={3} /> This username is taken
              </>
            )}
          </span>
        }
      />
      <p className="tw-text-right">
        <button
          disabled={!available}
          className="tw-daisy-btn tw-daisy-btn-primary tw-w-full lg:tw-w-auto tw-mt-8"
          onClick={save}
        >
          <SaveIcon /> Save Username
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
                value={500 / welcomeSteps[account.control].length}
                max="100"
              ></progress>
              <span className="tw-pt-4 tw-text-sm tw-font-bold tw-opacity-50">
                5 / {welcomeSteps[account.control].length}
              </span>
              <WelcomeIcons
                done={welcomeSteps[account.control].slice(0, 4)}
                todo={welcomeSteps[account.control].slice(5)}
                current="username"
              />
            </>
          ) : null}
        </>
      ) : null}
    </div>
  )
}
