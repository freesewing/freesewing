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
import { ListInput } from '@freesewing/react/components/Input'

const strings = {
  yes: {
    title: 'Yes, in case it may help me',
    desc:
      'Allowing us to compare your measurments to a baseline or others measurements sets ' +
      'allows us to detect potential problems in your measurements or patterns.',
  },
  no: {
    title: 'No, never compare',
    desc:
      'We get it, comparison is the thief of joy. Just be aware that this limits our ability ' +
      'to warn you about potential problems in your measurements sets or patterns.',
  },
}

/*
 * Component for the account/preferences/compare page
 *
 * @params {object} props - All React props
 * @params {bool} props.welcome - Set to true to use this component on the welcome page
 */
export const Compare = ({ welcome = false }) => {
  if (!Link) Link = WebLink

  // Hooks
  const { account, setAccount } = useAccount()
  const backend = useBackend()

  // State
  const [selection, setSelection] = useState(account?.compare ? 'yes' : 'no')

  // Context
  const { setLoadingStatus } = useContext(LoadingStatusContext)

  // Helper method to update the account
  const update = async (val) => {
    if (val !== selection) {
      setLoadingStatus([true, 'Saving preferences'])
      const [status, body] = await backend.updateAccount({
        compare: val === 'yes' ? true : false,
      })
      if (status === 200) {
        setLoadingStatus([true, 'Preferences saved', true, true])
        setAccount(body.account)
        setSelection(val)
      } else setLoadingStatus([true, 'An error occured. Please report this.', true, true])
    }
  }

  // Link to the next onboarding step
  const nextHref =
    welcomeSteps[account?.control].length > 3
      ? '/welcome/' + welcomeSteps[account?.control][4]
      : '/docs/about/guide'

  return (
    <div className="max-w-xl">
      <ListInput
        id="account-compare"
        label="Are you comfortable with your measurements sets being compared?"
        list={['yes', 'no'].map((val) => ({
          val,
          label: (
            <div className="flex flex-row items-center w-full justify-between">
              <span>{strings[val].title}</span>
              {val === 'yes' ? (
                <OkIcon className="w-8 h-8 text-success" stroke={4} />
              ) : (
                <NoIcon className="w-8 h-8 text-error" stroke={3} />
              )}
            </div>
          ),
          desc: strings[val].desc,
        }))}
        current={selection}
        update={update}
      />
      {welcome ? (
        <>
          <ContinueButton btnProps={{ href: nextHref }} link />
          {welcomeSteps[account?.control].length > 0 ? (
            <>
              <progress
                className="progress progress-primary w-full mt-12"
                value={400 / welcomeSteps[account?.control].length}
                max="100"
              ></progress>
              <span className="pt-4 text-sm font-bold opacity-50">
                4 / {welcomeSteps[account?.control].length}
              </span>
              <Icons
                done={welcomeSteps[account?.control].slice(0, 3)}
                todo={welcomeSteps[account?.control].slice(4)}
                current="compare"
              />
            </>
          ) : null}
        </>
      ) : null}
    </div>
  )
}
