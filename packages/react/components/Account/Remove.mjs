// Context
import { LoadingStatusContext } from '@freesewing/react/context/LoadingStatus'
import { ModalContext } from '@freesewing/react/context/Modal'

// Hooks
import React, { useState, useContext } from 'react'
import { useAccount } from '@freesewing/react/hooks/useAccount'
import { useBackend } from '@freesewing/react/hooks/useBackend'

// Components
import { Link as WebLink } from '@freesewing/react/components/Link'
import { BackIcon as ExitIcon, TrashIcon } from '@freesewing/react/components/Icon'
import { Popout } from '@freesewing/react/components/Popout'
import { IconButton } from '@freesewing/react/components/Button'
import { ModalWrapper } from '@freesewing/react/components/Modal'

/*
 * Component for the account/actions/remove page
 */
export const Remove = () => {
  // Hooks
  const backend = useBackend()
  const { signOut, account } = useAccount()

  // Context
  const { setLoadingStatus } = useContext(LoadingStatusContext)
  const { setModal, clearModal } = useContext(ModalContext)

  // Helper method to remove the account
  const removeAccount = async () => {
    setLoadingStatus([true, 'Talking to the backend'])
    const result = await backend.removeAccount()
    if (result.success) {
      setLoadingStatus([true, 'Done. Or rather, gone.', true, true])
      signOut()
    } else setLoadingStatus([true, 'An error occured. Please report this', true, false])
  }

  if (account.control === 5)
    return (
      <>
        <p>This button is red for a reason.</p>
        <IconButton onClick={removeAccount} color="error">
          <TrashIcon />
          Remove your FreeSewing account
        </IconButton>
      </>
    )

  return (
    <div className="tw-w-full">
      <IconButton
        onClick={() =>
          setModal(
            <ModalWrapper keepOpenOnClick>
              <div className="tw-text-center tw-w-full">
                <h2>There is no way back from this</h2>
                <p>If this is what you want, then go ahead.</p>
                <IconButton onClick={removeAccount} color="error" className="tw-mx-auto">
                  <TrashIcon />
                  Remove your FreeSewing account
                </IconButton>
                <IconButton
                  onClick={clearModal}
                  color="primary"
                  className="tw-mx-auto tw-daisy-btn-outline tw-mt-4"
                >
                  <ExitIcon />
                  Back to safety
                </IconButton>
              </div>
            </ModalWrapper>
          )
        }
      >
        <TrashIcon />
        Remove your FreeSewing account
      </IconButton>
    </div>
  )
}
