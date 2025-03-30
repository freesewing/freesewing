import React from 'react'
import { KeyVal } from '@freesewing/react/components/KeyVal'

export const UserRole = ({ role }) => {
  if (role === 'user') return <RoleUser />
  if (role === 'admin') return <RoleAdmin />

  return <b>fixme</b>
}

const RoleUser = () => <KeyVal k="role" val="user" color="success" />
const RoleAdmin = () => <KeyVal k="role" val="admin" color="error" />
