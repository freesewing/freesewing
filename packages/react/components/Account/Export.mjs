// Context
import { LoadingStatusContext } from '@freesewing/react/context/LoadingStatus'

// Hooks
import React, { useState, useContext } from 'react'
import { useAccount } from '@freesewing/react/hooks/useAccount'
import { useBackend } from '@freesewing/react/hooks/useBackend'

// Components
import { Link as WebLink } from '@freesewing/react/components/Link'
import { DownloadIcon } from '@freesewing/react/components/Icon'
import { Popout } from '@freesewing/react/components/Popout'
import { IconButton } from '@freesewing/react/components/Button'

/*
 * Component for the account/actions/export page
 */
export const Export = () => {
  // Hooks
  const backend = useBackend()
  const { setLoadingStatus } = useContext(LoadingStatusContext)

  // State
  const [link, setLink] = useState()

  // Helper method to export account
  const exportData = async () => {
    setLoadingStatus([true, 'Contacting backend'])
    const [status, body] = await backend.exportAccount()
    if (status === 200) {
      setLink(body.data)
      setLoadingStatus([true, 'All done', true, true])
    } else setLoadingStatus([true, 'Something went wrong, please report this', true, false])
  }

  return (
    <div className="max-w-xl">
      {link ? (
        <Popout link>
          <h5>Your data was exported and is available for download at the following location:</h5>
          <p className="text-lg">
            <WebLink href={link}>{link}</WebLink>
          </p>
        </Popout>
      ) : null}
      <p>Click below to export your personal FreeSewing data</p>
      <IconButton onClick={exportData} title="Export your data">
        <DownloadIcon />
        Export Your Data
      </IconButton>
    </div>
  )
}
