// Hooks
import { useState, useContext, useEffect } from 'react'
import { useTranslation } from 'next-i18next'
import { useAccount } from 'shared/hooks/use-account.mjs'
import { useBackend } from 'shared/hooks/use-backend.mjs'
// Context
import { LoadingContext } from 'shared/context/loading-context.mjs'
// Components
import { Spinner } from 'shared/components/spinner.mjs'
import { Error404, ns as ns404 } from 'shared/components/errors/404.mjs'

export const ns = [...ns404]

const ManageOwnPattern = ({ pattern }) => {
  return <p>Manage own pattern</p>
}

const ManagePublicPattern = ({ pattern }) => {
  return <p>Manage public pattern</p>
}

const AccessDenied = ({ pattern }) => {
  return <p>Access Denied</p>
}

export const ManagePattern = ({ id = false }) => {
  // Context
  const { loading, startLoading, stopLoading } = useContext(LoadingContext)

  // Hooks
  const { account, setAccount, token } = useAccount()
  const backend = useBackend(token)
  const { t } = useTranslation(ns)

  // State
  const [pattern, setPattern] = useState({})
  const [error, setError] = useState(false)

  // Effect
  useEffect(() => {
    const loadPattern = async () => {
      const result = await backend.getPattern(id)
      if (result.success) {
        if (result.data.pattern) {
          setPattern(result.data.pattern)
        }
      } else {
        if (result.response.response.status === 404) setError(404)
      }
    }
    if (id && Number(id) !== pattern.id) loadPattern()
  }, [id, pattern.id])

  if (error === 404) return <Error404 err={{ title: `Pattern ${id} not found` }} />

  return (
    <>
      <p>Manage pattern here</p>
      <Spinner className="w-12 h-12 text-primary animate-spin" />
      <pre>{JSON.stringify(pattern, null, 2)}</pre>
    </>
  )
}
