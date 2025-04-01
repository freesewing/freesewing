// Dependencies
import { welcomeSteps } from './shared.mjs'
import { linkClasses } from '@freesewing/utils'

// Context
import { LoadingStatusContext } from '@freesewing/react/context/LoadingStatus'

// Hooks
import React, { useState, useContext } from 'react'
import { useAccount } from '@freesewing/react/hooks/useAccount'
import { useBackend } from '@freesewing/react/hooks/useBackend'

// Components
import { Link as WebLink } from '@freesewing/react/components/Link'
import { NoIcon, OkIcon, SaveIcon, RightIcon } from '@freesewing/react/components/Icon'
import { ListInput } from '@freesewing/react/components/Input'
import { Popout } from '@freesewing/react/components/Popout'
import { IconButton } from '@freesewing/react/components/Button'
import { WelcomeIcons } from './shared.mjs'

/*
 * Component for the account/preferences/newsletter page
 *
 * @params {object} props - All React props
 * @params {bool} props.welcome - Set to true to use this component on the welcome page
 * @param {function} props.Link - An optional framework-specific Link component
 */
export const Newsletter = ({ welcome = false, Link = false }) => {
  if (!Link) Link = WebLink

  // Hooks
  const { account, setAccount } = useAccount()
  const backend = useBackend()
  const { setLoadingStatus } = useContext(LoadingStatusContext)

  // State
  const [selection, setSelection] = useState(account?.newsletter ? 'yes' : 'no')

  // Helper method to update account
  const update = async (val) => {
    if (val !== selection) {
      setLoadingStatus([true, 'Saving preferences'])
      const [status, body] = await backend.updateAccount({
        newsletter: val === 'yes' ? true : false,
      })
      if (status === 200) {
        setLoadingStatus([true, 'Preferences saved', true, true])
        setAccount(body.account)
        setSelection(val)
      } else setLoadingStatus([true, 'An error occured. Please report this.', true, true])
    }
  }

  // Next step for onboarding
  const nextHref =
    welcomeSteps[account?.control].length > 2
      ? '/welcome/' + welcomeSteps[account?.control][2]
      : '/docs/about/guide'

  return (
    <div className="tw-w-full">
      <ListInput
        id="account-newsletter"
        label="Would you like to receive the FreeSewing newsletter?"
        list={['yes', 'no'].map((val) => ({
          val,
          label: (
            <div className="tw-flex tw-flex-row tw-items-center tw-w-full tw-justify-between">
              <span>
                {val === 'yes' ? 'Yes, I would like to receive the newsletter' : 'No thanks'}
              </span>
              {val === 'yes' ? (
                <OkIcon className="tw-w-8 tw-h-8 tw-text-success" stroke={4} />
              ) : (
                <NoIcon className="tw-w-8 tw-h-8 tw-text-error" stroke={3} />
              )}
            </div>
          ),
          desc:
            val === 'yes'
              ? `Once every 3 months you'll receive an email from us with honest wholesome content. No tracking, no ads, no nonsense.`
              : `You can always change your mind later. But until you do, we will not send you any newsletters.`,
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
                value={200 / welcomeSteps[account?.control].length}
                max="100"
              ></progress>
              <span className="tw-pt-4 tw-text-sm tw-font-bold tw-opacity-50">
                2 / {welcomeSteps[account?.control].length}
              </span>
              <WelcomeIcons
                done={welcomeSteps[account?.control].slice(0, 1)}
                todo={welcomeSteps[account?.control].slice(2)}
                current="newsletter"
              />
            </>
          ) : null}
        </>
      ) : null}
      {welcome ? null : (
        <Popout tip>
          <h5>You can unsubscribe at any time with the link below</h5>
          <p>
            This unsubscribe link will also be included at the bottom of every newsletter we send
            you, so you do not need to bookmark it, but you can if you want to.
          </p>
          <p>
            <Link href={`/newsletter/unsubscribe?x=${account?.ehash}`} className={linkClasses}>
              Unsubscribe link
            </Link>
          </p>
          <p className="tw-text-sm">
            This link is to unsubscribe you specifically, do not share it with other subscribers.
          </p>
        </Popout>
      )}
    </div>
  )
}
