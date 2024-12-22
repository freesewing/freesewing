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
          className={`${sharedClasses} rounded-l${small ? '' : '-lg'} text-${color}-content bg-${color} border-${color} ${small ? 'text-xs' : ''}`}
        >
          {k}
        </span>
        <span
          className={`${sharedClasses} rounded-r${small ? '' : '-lg'} text-${color} bg-base-100 border-${color} ${small ? 'text-xs' : ''}`}
        >
          {val}
        </span>
      </button>
    </Copy>
  )
}

const sharedClasses = `px-1 text-sm font-medium whitespace-nowrap border-2`

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
