import React from 'react'
import { KeyVal } from '@freesewing/react/components/KeyVal'

export const AccountStatus = ({ status }) => {
  if (status === 0) return <AccountInactive />
  if (status === 1) return <AccountActive />
  if (status === -1) return <AccountFrozen />
  if (status === -2) return <AccountBlocked />

  return <b>Invalid status: {status}</b>
}

const AccountInactive = () => <KeyVal k="status" val="inactive" color="warning" />
const AccountActive = () => <KeyVal k="status" val="active" color="success" />
const AccountFrozen = () => <KeyVal k="status" val="frozen" color="accent" />
const AccountBlocked = () => <KeyVal k="status" val="blocked" color="error" />
