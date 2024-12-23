import React, { useState } from 'react'
import { shortUuid } from '@freesewing/utils'
import { Link } from '@freesewing/react/components/Link'
import { CopyToClipboard } from '@freesewing/react/components/CopyToClipboard'

/*
 * Displays a UUID, but shorter
 *
 * @param {object} props - All React props
 * @param {string} uuid - The UUID
 * @param {string} href - An optional href to make this UUID a link
 * @param {string} label - An optional label to show in the loading status
 */
export const Uuid = ({ uuid, href = false, label = false }) => {
  const [full, setFull] = useState()
  const short = shortUuid(uuid)

  if (href === false)
    return (
      <span className="flex flex-row items-center">
        <span className="daisy-badge daisy-badge-secondary font-mono">{shortUuid(uuid)}</span>
        <CopyToClipboard content={uuid} label="UUID" sup />
      </span>
    )

  return (
    <span className="flex flex-row items-center">
      <Link href={href} title={uuid}>
        <span className="daisy-badge daisy-badge-secondary font-mono">{shortUuid(uuid)}</span>
      </Link>
      <CopyToClipboard content={uuid} label="UUID" sup label />
    </span>
  )
}
