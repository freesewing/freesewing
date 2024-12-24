// Dependencies
import { welcomeSteps } from './shared.mjs'
import { controlDesc } from '@freesewing/config'

// Context
import { LoadingStatusContext } from '@freesewing/react/context/LoadingStatus'

// Hooks
import React, { useState, useContext } from 'react'
import { useAccount } from '@freesewing/react/hooks/useAccount'
import { useBackend } from '@freesewing/react/hooks/useBackend'
import { useControl } from '@freesewing/react/hooks/useControl'

// Components
import { Link as WebLink } from '@freesewing/react/components/Link'
import { RightIcon, NoIcon, OkIcon, SaveIcon } from '@freesewing/react/components/Icon'
import { ListInput } from '@freesewing/react/components/Input'
import { ControlScore } from '@freesewing/react/components/Control'
import { IconButton } from '@freesewing/react/components/Button'
import { WelcomeIcons } from './shared.mjs'

const strings = {
  1: {
    title: 'Keep it as simple as possible',
    desc:
      'Allowing us to compare your measurments to a baseline or others measurements sets ' +
      'allows us to detect potential problems in your measurements or patterns.',
  },
  2: {
    title: 'No, never compare',
    desc:
      'We get it, comparison is the thief of joy. Just be aware that this limits our ability ' +
      'to warn you about potential problems in your measurements sets or patterns.',
  },
}

/*
 * Component for the account/preferences/control page
 *
 * @params {object} props - All React props
 * @params {bool} props.welcome - Set to true to use this component on the welcome page
 */
export const Control = ({ welcome = false }) => {
  // Hooks
  const { control, updateControl } = useControl()

  // Helper to get the link to the next onboarding step
  const nextHref = welcome
    ? welcomeSteps[control].length > 1
      ? '/welcome/' + welcomeSteps[control][1]
      : '/docs/about/guide'
    : false

  return (
    <div className="w-full">
      <ListInput
        id="account-control"
        label="What user experience do you prefer?"
        list={[1, 2, 3, 4, 5].map((val) => ({
          val,
          label: (
            <div className="flex flex-row items-center w-full justify-between">
              <span>{controlDesc[val].title}</span>
              <ControlScore control={val} />
            </div>
          ),
          desc: controlDesc[val].desc,
        }))}
        current={control}
        update={updateControl}
      />
      {welcome ? (
        <>
          <IconButton href={nextHref} className="mt-4">
            <RightIcon stroke={3} /> Continue
          </IconButton>
          {welcomeSteps[control].length > 1 ? (
            <>
              <progress
                className="daisy-progress daisy-progress-primary w-full mt-12"
                value={100 / welcomeSteps[control].length}
                max="100"
              ></progress>
              <span className="pt-4 text-sm font-bold opacity-50">
                1 / {welcomeSteps[control].length}
              </span>
              <WelcomeIcons done={[]} todo={welcomeSteps[control].slice(1)} current="" />
            </>
          ) : null}
        </>
      ) : null}
    </div>
  )
}
