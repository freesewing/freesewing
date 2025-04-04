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
import { ListInput } from '@freesewing/react/components/Input'
import { NumberCircle } from '@freesewing/react/components/Number'
import { IconButton } from '@freesewing/react/components/Button'
import { WelcomeIcons } from './shared.mjs'

/*
 * Component for the account/preferences/units page
 *
 * @params {object} props - All React props
 * @params {bool} props.welcome - Set to true to use this component on the welcome page
 */
export const Units = ({ welcome = false }) => {
  // Hooks
  const { account, setAccount } = useAccount()
  const { setLoadingStatus } = useContext(LoadingStatusContext)
  const backend = useBackend()

  // State
  const [selection, setSelection] = useState(account?.imperial === true ? 'imperial' : 'metric')

  // Helper method to update account
  const update = async (val) => {
    if (val !== selection) {
      setLoadingStatus([true, 'Saving units'])
      const [status, body] = await backend.updateAccount({
        imperial: val === 'imperial' ? true : false,
      })
      if (status === 200 && body.result === 'success') {
        setAccount(body.account)
        setSelection(body.account.imperial ? 'imperial' : 'metric')
        setLoadingStatus([true, 'Units updated', true, true])
      } else setLoadingStatus([true, 'Something went wrong. Please report this', true, true])
    }
  }

  // Next step in the onboarding
  const nextHref =
    welcomeSteps[account?.control].length > 3
      ? '/welcome/' + welcomeSteps[account?.control][3]
      : '/docs/about/guide'

  return (
    <div className="tw-w-full">
      <ListInput
        id="account-units"
        label="Units"
        list={['metric', 'imperial'].map((val) => ({
          val,
          label: (
            <div className="tw-flex tw-flex-row tw-items-center tw-w-full tw-justify-between">
              <span>{val === 'metric' ? 'Metric units (cm)' : 'Imperial units (inch)'}</span>
              <NumberCircle nr={val === 'imperial' ? '″' : 'cm'} color="secondary" />
            </div>
          ),
          desc:
            val === 'metric'
              ? 'Pick this if you prefere centimeters over inches'
              : 'Pick this if you prefer inches over centimeters',
        }))}
        current={selection}
        update={update}
      />
      {welcome ? (
        <>
          <IconButton href={nextHref} className="tw-mt-4">
            <RightIcon stroke={3} /> Continue
          </IconButton>
          {welcomeSteps[account?.control].length > 0 ? (
            <>
              <progress
                className="tw-daisy-progress tw-daisy-progress-primary tw-w-full tw-mt-12"
                value={300 / welcomeSteps[account?.control].length}
                max="100"
              ></progress>
              <span className="tw-pt-4 tw-text-sm tw-font-bold tw-opacity-50">
                3 / {welcomeSteps[account?.control].length}
              </span>
              <WelcomeIcons
                done={welcomeSteps[account?.control].slice(0, 2)}
                todo={welcomeSteps[account?.control].slice(3)}
                current="units"
              />
            </>
          ) : null}
        </>
      ) : null}
    </div>
  )
}
