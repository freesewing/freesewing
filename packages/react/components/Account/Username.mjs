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
import { NoIcon, OkIcon, SaveIcon } from '@freesewing/react/components/Icon'
import { StringInput } from '@freesewing/react/components/Input'

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
    <div className="w-full">
      <StringInput
        id="account-username"
        label="Username"
        current={username}
        update={update}
        valid={() => available}
        placeholder={'Sorcha Ni Dhubghaill'}
        labelBL={
          <span className="flex flex-row gap-1 items-center">
            {available ? (
              <>
                <OkIcon className="w-4 h-4 text-success" stroke={4} /> Username is available
              </>
            ) : (
              <>
                <NoIcon className="w-4 h-4 text-error" stroke={3} /> This username is taken
              </>
            )}
          </span>
        }
      />
      <p className="text-right">
        <button
          disabled={!available}
          className="daisy-btn daisy-btn-primary w-full lg:w-auto mt-8"
          onClick={save}
        >
          <SaveIcon /> Save Username
        </button>
      </p>

      {welcome ? (
        <>
          <ContinueButton btnProps={{ href: nextHref }} link />
          {welcomeSteps[account.control].length > 0 ? (
            <>
              <progress
                className="progress progress-primary w-full mt-12"
                value={500 / welcomeSteps[account.control].length}
                max="100"
              ></progress>
              <span className="pt-4 text-sm font-bold opacity-50">
                5 / {welcomeSteps[account.control].length}
              </span>
              <Icons
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
