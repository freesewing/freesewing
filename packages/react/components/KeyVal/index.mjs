import React, { useState, useContext } from 'react'
import { CopyToClipboard as Copy } from 'react-copy-to-clipboard'
import { LoadingStatusContext } from '@freesewing/react/context/LoadingStatus'

export const KeyVal = ({ k, val, color = 'primary', small = false }) => {
  const [copied, setCopied] = useState(false)
  const { setLoadingStatus } = useContext(LoadingStatusContext)

  return (
    <Copy text={val} onCopy={() => handleCopied(setCopied, setLoadingStatus, k)}>
      <button>
        <span
          className={`${sharedClasses} tw-rounded-l${small ? '' : '-lg'} tw-text-${color}-content tw-bg-${color} tw-border-${color} ${small ? 'tw-text-xs' : ''}`}
        >
          {k}
        </span>
        <span
          className={`${sharedClasses} tw-rounded-r${small ? '' : '-lg'} tw-text-${color} tw-bg-base-100 tw-border-${color} ${small ? 'tw-text-xs' : ''}`}
        >
          {val}
        </span>
      </button>
    </Copy>
  )
}

const sharedClasses = `tw-px-1 tw-text-sm tw-font-medium tw-whitespace-nowrap tw-border-2`

const handleCopied = (setCopied, setLoadingStatus, label) => {
  setCopied(true)
  setLoadingStatus([
    true,
    label ? `${label} copied to clipboard` : 'Copied to clipboard',
    true,
    true,
  ])
  setTimeout(() => setCopied(false), 1000)
}
