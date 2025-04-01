// Dependencies
import { linkClasses } from '@freesewing/utils'

// Context
import { LoadingStatusContext } from '@freesewing/react/context/LoadingStatus'
import { ModalContext } from '@freesewing/react/context/Modal'

// Hooks
import React, { useState, useContext } from 'react'
import { useAccount } from '@freesewing/react/hooks/useAccount'
import { useBackend } from '@freesewing/react/hooks/useBackend'

// Components
import { Link as WebLink } from '@freesewing/react/components/Link'
import { BackIcon, NoIcon } from '@freesewing/react/components/Icon'
import { Popout } from '@freesewing/react/components/Popout'
import { IconButton } from '@freesewing/react/components/Button'
import { ModalWrapper } from '@freesewing/react/components/Modal'

/*
 * Component for the account/actions/restrict page
 */
export const Restrict = ({ Link = false }) => {
  if (!Link) Link = WebLink

  // Hooks
  const backend = useBackend()
  const { signOut, account } = useAccount()

  // Context
  const { setLoadingStatus } = useContext(LoadingStatusContext)
  const { setModal, clearModal } = useContext(ModalContext)

  // Helper method to restrict the account
  const restrictAccount = async () => {
    setLoadingStatus([true, 'Talking to the backend'])
    const [status, body] = await backend.restrictAccount()
    if (status === 200) {
      setLoadingStatus([true, 'Done. Consider yourself restrcited.', true, true])
      signOut()
    } else setLoadingStatus([true, 'An error occured. Please report this', true, false])
  }

  if (account.control === 5)
    return (
      <>
        <p>This button is red for a reason.</p>
        <IconButton onClick={restrictAccount} color="error">
          <Nocon />
          Remove your FreeSewing account
        </IconButton>
      </>
    )

  return (
    <div className="tw-w-full">
      <p>
        The GDPR guarantees{' '}
        <Link href="/docs/about/rights/#the-right-to-restrict-processing" className={linkClasses}>
          your right to restrict processing
        </Link>{' '}
        of your personal data.
      </p>
      <p>This will disable your account, but not remove any data.</p>
      <IconButton
        onClick={() =>
          setModal(
            <ModalWrapper keepOpenOnClick>
              <div className="tw-text-center tw-w-full tw-max-w-xl">
                <h2>Proceed with caution</h2>
                <p>
                  While no data will be removed, this will disable your account. Furthermore, you
                  can not undo this on your own, but will have to contact support when you want to
                  restore access to your account.
                </p>
                <IconButton onClick={restrictAccount} color="error" className="tw-mx-auto">
                  <NoIcon stroke={3} />
                  Restrict processing of your FreeSewing data
                </IconButton>
                <IconButton
                  onClick={clearModal}
                  color="primary"
                  className="tw-mx-auto tw-daisy-btn-outline tw-mt-4"
                >
                  <BackIcon />
                  Back to safety
                </IconButton>
              </div>
            </ModalWrapper>
          )
        }
      >
        <NoIcon stroke={3} />
        Restrict processing of your FreeSewing data
      </IconButton>
    </div>
  )
}
