// Context
import { LoadingStatusContext } from '@freesewing/react/context/LoadingStatus'

// Hooks
import React, { useState, useContext } from 'react'
import { useAccount } from '@freesewing/react/hooks/useAccount'
import { useBackend } from '@freesewing/react/hooks/useBackend'

// Components
import { SaveIcon } from '@freesewing/react/components/Icon'
import { StringInput } from '@freesewing/react/components/Input'

/*
 * Component for the account/social/github page
 */
export const Instagram = () => {
  // Hooks
  const { account, setAccount } = useAccount()
  const backend = useBackend()
  const { setLoadingStatus } = useContext(LoadingStatusContext)

  // State
  const [githubUsername, setGithubUsername] = useState(account.data.githubUsername || '')
  const [githubEmail, setGithubEmail] = useState(account.data.githubEmail || '')

  // Helper method to save changes
  const save = async () => {
    setLoadingStatus([true, 'Saving bio'])
    const [status, body] = await backend.updateAccount({ data: { githubUsername, githubEmail } })
    if (status === 200 && body.result === 'success') {
      setAccount(body.account)
      setLoadingStatus([true, 'GitHub info updated', true, true])
    } else setLoadingStatus([true, 'Something went wrong. Please report this', true, true])
  }

  return (
    <div className="tw-w-full">
      <StringInput
        id="account-github-email"
        label="GitHub Email Address"
        current={githubEmail}
        update={setGithubEmail}
        valid={(val) => val.length > 0}
        placeholder={'joost@joost.at'}
      />
      <StringInput
        id="account-github-username"
        label="GitHub Username"
        current={githubUsername}
        update={setGithubUsername}
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
