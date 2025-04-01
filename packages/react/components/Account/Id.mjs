// Hooks
import React, { useState } from 'react'
import { useAccount } from '@freesewing/react/hooks/useAccount'

// Components
import { Link as WebLink } from '@freesewing/react/components/Link'

/*
 * Component to display a user ID
 *
 * @params {object} props - All React props
 * @params {function} props.Link - A framework specific Link component for client-side routing
 */
export const UserId = ({ Link = false }) => {
  if (!Link) Link = WebLink

  // Hooks
  const { account } = useAccount()
  const [id, setId] = useState(account.id)

  return id || null
}
