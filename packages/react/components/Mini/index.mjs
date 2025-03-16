import React from 'react'
import { TipIcon, ChatIcon } from '@freesewing/react/components/Icon'

export const MiniTip = ({ children }) => (
  <div className="tw-flex tw-flex-row tw-border tw-border-success tw-rounded">
    <div className="tw-bg-success tw-text-success-content tw-p-1 tw-rounded-l tw-flex tw-flex-row tw-items-center">
      <TipIcon className="tw-w-6 tw-h-6 tw-text-success-content" />
    </div>
    <div className="tw-p-1 tw-px-2 tw-text-sm tw-font-medium tw-bg-success/10 tw-grow tw-rounded-r">
      {children}
    </div>
  </div>
)

export const MiniNote = ({ children }) => (
  <div className="tw-flex tw-flex-row tw-border tw-border-info tw-rounded">
    <div className="tw-bg-info tw-text-info-content tw-p-1 tw-rounded-l tw-flex tw-flex-row tw-items-center">
      <ChatIcon className="tw-w-6 tw-h-6 tw-text-info-content" />
    </div>
    <div className="tw-p-1 tw-px-2 tw-text-sm tw-font-medium tw-bg-info/10 tw-grow tw-rounded-r">
      {children}
    </div>
  </div>
)
