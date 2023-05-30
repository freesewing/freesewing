// Hooks
import { useState, useContext, useEffect } from 'react'
import { useTranslation } from 'next-i18next'
import { useAccount } from 'shared/hooks/use-account.mjs'
import { useBackend } from 'shared/hooks/use-backend.mjs'
// Context
import { NavigationContext } from 'shared/context/navigation-context.mjs'
import { LoadingContext } from 'shared/context/loading-context.mjs'
// Components
import { Spinner } from 'shared/components/spinner.mjs'
import { Error404, ns as ns404 } from 'shared/components/errors/404.mjs'
import { PatternPreview } from 'shared/components/pattern/preview.mjs'
import {
  SettingsIcon,
  DownloadIcon,
  TrashIcon,
  OkIcon,
  NoIcon,
  DesignIcon,
  MeasureIcon,
} from 'shared/components/icons.mjs'
import { capitalize } from 'shared/utils.mjs'
import Link from 'next/link'
import Timeago from 'react-timeago'
import { PageLink } from 'shared/components/page-link.mjs'
import { Popout } from 'shared/components/popout.mjs'

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
  const { addPages } = useContext(NavigationContext)
  const { loading, startLoading, stopLoading } = useContext(LoadingContext)

  // State
  const [pattern, setPattern] = useState({})
  const [error, setError] = useState(false)

  // Hooks
  const { account, setAccount, token } = useAccount()
  const backend = useBackend(token)
  const { t, i18n } = useTranslation(ns)
  const { language } = i18n

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

  useEffect(() => {
    if (pattern.id) {
      addPages([[['patterns', '' + pattern.id], { t: pattern.name, s: `patterns/${pattern.id}` }]])
    }
  }, [pattern.id])

  if (error === 404) return <Error404 err={{ title: `Pattern ${id} not found` }} />

  if (!pattern.id) return <Spinner className="w-12 h-12 text-primary animate-spin" />

  let measurements = {}
  if (pattern.set) measurements = pattern.set.measies
  else if (pattern.cset) measurements = pattern.cset.measies

  return (
    <div className="">
      <div className="flex flex-col lg:flex-row lg:gap-4 mb-4">
        <Popout note compact dense title={<DesignIcon className="flex h-6 w-6 mr-4" />}>
          <Link
            className="capitalize font-bold hover:underline hover:pointer-cursor"
            href={`/designs/${pattern.design}`}
          >
            {pattern.design}
          </Link>
        </Popout>
        <Popout link compact dense title={<MeasureIcon className="flex h-6 w-6 mr-4" />}>
          <Link
            className="capitalize font-bold hover:underline hover:pointer-cursor"
            href={pattern.set ? `/sets/${pattern.set.id}` : `/csets/${pattern.cset.id}`}
          >
            {pattern.cset ? pattern.cset[`name${capitalize(language)}`] : pattern.set?.name}
          </Link>
        </Popout>
      </div>
      <div className="block lg:flex lg:flex-row">
        <div className="w-full max-w-4xl max-h-screen mb-4">
          <PatternPreview
            design={pattern.design}
            settings={{ ...pattern.settings, measurements }}
          />
        </div>
        <div className="w-64 flex flex-col gap-2">
          <Link
            className="btn btn-secondary w-full"
            href={`/patterns/${pattern.id}/edit#view="draft"`}
            title={t('draftPattern')}
          >
            <SettingsIcon />
            <span className="pl-2">{t('draftPattern')}</span>
          </Link>
          <Link
            className="btn btn-primary w-full"
            href={`/patterns/${pattern.id}/edit#view="export"`}
            title={t('exportPattern')}
          >
            <DownloadIcon />
            <span className="pl-2">{t('exportPattern')}</span>
          </Link>
          <button
            className="btn btn-error w-full"
            title={t('exportPattern')}
            onClick={() => setModal(<p>fixme: implement this</p>)}
          >
            <TrashIcon />
            <span className="pl-2">{t('removePattern')}</span>
          </button>
          {account.control > 2 ? (
            <ul className="list list-disc list-inside mt-4">
              <li>
                <b>{t('permalink')}: </b>
                {pattern.public ? (
                  <PageLink href={`/patterns/${pattern.id}`} txt={`/patterns/${pattern.id}`} />
                ) : (
                  <NoIcon className="w-4 h-4 text-error" />
                )}
              </li>
              <li>
                <b>{t('created')}</b>: <Timeago date={pattern.createdAt} />
              </li>
              <li>
                <b>{t('updated')}</b>: <Timeago date={pattern.updatedAt} />
              </li>
            </ul>
          ) : null}
        </div>
      </div>
      <pre>{JSON.stringify(pattern, null, 2)}</pre>
    </div>
  )
}
