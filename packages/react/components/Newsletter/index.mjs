// Dependencies
import { linkClasses, validateEmail } from '@freesewing/utils'

// Context
import { LoadingStatusContext } from '@freesewing/react/context/LoadingStatus'

// Hooks
import React, { useState, useContext } from 'react'
import { useAccount } from '@freesewing/react/hooks/useAccount'
import { useBackend } from '@freesewing/react/hooks/useBackend'

// Components
import { Link as WebLink } from '@freesewing/react/components/Link'
import { NoIcon, OkIcon, SaveIcon, RightIcon, WarningIcon } from '@freesewing/react/components/Icon'
import { EmailInput } from '@freesewing/react/components/Input'
import { Popout } from '@freesewing/react/components/Popout'
import { IconButton } from '@freesewing/react/components/Button'

/*
 * Component for newsletter signup (by visitors)
 *
 * @params {object} props - All React props
 * @param {function} props.Link - An optional framework-specific Link component
 */
export const NewsletterSignup = ({ Link = false, noP = false, noTitle = false, noBox = false }) => {
  if (!Link) Link = WebLink

  // Hooks
  const { account, setAccount } = useAccount()
  const backend = useBackend()
  const { setLoadingStatus } = useContext(LoadingStatusContext)

  // State
  const [email, setEmail] = useState('')
  const [unsubscribe, setUnsubscribe] = useState(false)
  const [subscribed, setSubscribed] = useState(false)

  // Helper method to handle subscription
  const subscribe = async () => {
    setLoadingStatus([true, 'Contacting backend'])
    const [status, body] = unsubscribe
      ? await backend.newsletterStartUnsubscribe(email)
      : await backend.newsletterSubscribe(email)
    if (status === 200) {
      setLoadingStatus([true, 'Request Initiated', true, true])
      setSubscribed(true)
    } else setLoadingStatus([true, 'An error occured. Please report this.', true, true])
  }

  return (
    <div
      className={
        noBox ? '' : 'tw-w-full tw-shadow tw-border tw-rounded-lg tw-p-4 tw-bg-secondary/5'
      }
    >
      {subscribed ? (
        <>
          <h4>Now check your inbox for a confirmation E-mail</h4>
          <p>
            We have sent and email to <b>{email}</b> with a link to confirm this action.
          </p>
          <div className="tw-ml-2 tw-pl-2 tw-border-l-4 tw-border-secondary/20">
            <h6 className="tw-mt-2 tw-pb-0">Why do I need to confirm this?</h6>
            <small>
              Without this confirmation step, anyone could attempt to {unsubscribe ? 'un' : ''}
              subcribe this E-mail address {unsubscribe ? 'from' : 'to'} our newsletter.
            </small>
          </div>
        </>
      ) : (
        <>
          {noTitle ? null : <h4>Subcribe to the FreeSewing newsletter</h4>}
          {noP ? null : (
            <p>
              Subscribe to our newsletter and once every 3 months you will receive an email from us
              with honest wholesome content. No tracking, no ads, no nonsense.
            </p>
          )}
          <EmailInput
            label="E-mail Address"
            labelTR={
              <>
                You can{' '}
                <button className={linkClasses} onClick={() => setUnsubscribe(!unsubscribe)}>
                  {unsubscribe ? 're-' : 'un'}subscribe
                </button>{' '}
                at any time
              </>
            }
            labelBL={
              <span className="tw-flex tw-flex-row tw-items-center tw-flex-wrap tw-gap-1">
                {validateEmail(email) ? (
                  <>
                    <OkIcon className="tw-text-success tw-w-5 tw-h-5" stroke={3} />
                    Looks great, click below to {unsubscribe ? 'un' : ''}subscribe this address
                  </>
                ) : (
                  <>
                    <WarningIcon className="tw-text-error tw-w-5 tw-h-5" /> Please enter a valid
                    E-mail address
                  </>
                )}
              </span>
            }
            update={setEmail}
            current={email}
            valid={validateEmail}
          />
          <button
            className="tw-daisy-btn tw-daisy-btn-primary tw-w-full"
            disabled={!validateEmail(email)}
            onClick={subscribe}
          >
            {unsubscribe ? `Unsubscribe` : 'Subscribe'}
          </button>
        </>
      )}
    </div>
  )
}
