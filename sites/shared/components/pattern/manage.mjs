import { freeSewingConfig as conf } from 'shared/config/freesewing.config.mjs'
// Hooks
import { useState, useContext, useEffect } from 'react'
import { useTranslation } from 'next-i18next'
import { useAccount } from 'shared/hooks/use-account.mjs'
import { useBackend } from 'shared/hooks/use-backend.mjs'
import { useToast } from 'shared/hooks/use-toast.mjs'
// Context
import { NavigationContext } from 'shared/context/navigation-context.mjs'
// Components
import Markdown from 'react-markdown'
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
import { EditRow } from 'shared/components/account/patterns.mjs'

export const ns = [...ns404, 'toast']

export const ManagePattern = ({ id = false }) => {
  // Context
  const { addPages } = useContext(NavigationContext)

  // State
  const [pattern, setPattern] = useState({})
  const [error, setError] = useState(false)

  // Hooks
  const { account, token } = useAccount()
  const backend = useBackend(token)
  const { t, i18n } = useTranslation(ns)
  const { language } = i18n
  const toast = useToast()

  // async effect helper
  const loadPattern = async () => {
    const result = await backend.getPattern(id)
    if (result.success) {
      if (result.data.pattern) {
        setPattern(result.data.pattern)
        addPages([
          [
            ['patterns', '' + result.data.pattern.id],
            { t: result.data.pattern.name, s: `patterns/${pattern.id}` },
          ],
        ])
      }
    } else {
      if (result.response.response.status === 404) setError(404)
    }
  }

  // Effect
  useEffect(() => {
    if (id && Number(id) !== pattern.id) loadPattern()
  }, [id, pattern.id])

  if (error === 404) return <Error404 err={{ title: `Pattern ${id} not found` }} />

  if (!pattern.id) return <Spinner className="w-12 h-12 text-primary animate-spin" />

  let measurements = {}
  if (pattern.set) measurements = pattern.set.measies
  else if (pattern.cset) measurements = pattern.cset.measies

  // Helper method to toggle public setting
  const togglePublic = async () => {
    const pub = !pattern.public
    const result = await backend.updatePattern(pattern.id, { public: pub })
    if (result.success) {
      if (result.data.pattern) {
        setPattern(result.data.pattern)
        toast.for.settingsSaved()
      }
    }
  }

  // Helper method to re-fetch pattern from backend
  const refresh = () => loadPattern()

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

      <div className="block lg:flex lg:flex-row lg:gap-4">
        <div className="w-full max-w-4xl max-h-screen mb-4">
          {pattern.notes ? (
            <>
              <h2>{t('notes')}</h2>
              <div className="text-left px-4 border w-full">
                <Markdown>{pattern.notes}</Markdown>
              </div>
            </>
          ) : null}
          {pattern.userId === account.id ? (
            <>
              <h2>{t('update')}</h2>
              {/* Name is always shown */}
              <EditRow title={t('name')} field="name" {...{ pattern, backend, t, toast, refresh }}>
                {pattern.name}
              </EditRow>

              {/* img: Control level determines whether or not to show this */}
              {pattern.id && account.control >= conf.account.patterns.img ? (
                <EditRow
                  title={t('image')}
                  field="img"
                  {...{ pattern, backend, t, toast, refresh }}
                >
                  <img
                    src={pattern.img}
                    className="w-10 mask mask-squircle bg-neutral aspect-square"
                  />
                </EditRow>
              ) : null}

              {/* notes: Control level determines whether or not to show this */}
              {account.control >= conf.account.patterns.notes ? (
                <EditRow
                  title={t('notes')}
                  field="notes"
                  {...{ pattern, backend, t, toast, refresh }}
                >
                  <Markdown>{pattern.notes}</Markdown>
                </EditRow>
              ) : null}
            </>
          ) : null}
          <div className="mb-8 h-64">
            <Popout fixme compact dense>
              Fix pattern overflow
            </Popout>
            <PatternPreview
              design={pattern.design}
              settings={{ ...pattern.settings, measurements }}
            />
          </div>
        </div>
        <div className="w-64 flex flex-col gap-2">
          <img
            alt="img"
            src={pattern.img}
            className="shadow mb-4 mask mask-squircle bg-neutral aspect-square"
          />
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
          {account.control > 2 ? (
            <button
              className={`btn btn-${pattern.public ? 'warning' : 'success'} w-full`}
              title={t(pattern.public ? 'makePrivate' : 'makePublic')}
              onClick={togglePublic}
            >
              {pattern.public ? <NoIcon /> : <OkIcon />}
              <span className="pl-2">{t(pattern.public ? 'makePrivate' : 'makePublic')}</span>
            </button>
          ) : null}
          <button
            className="btn btn-error w-full"
            title={t('exportPattern')}
            onClick={() => console.log('fixme: implement this')}
          >
            <TrashIcon />
            <span className="pl-2">{t('removePattern')}</span>
          </button>
          {account.control > 2 ? (
            <ul className="list list-disc list-inside mt-4">
              <li className="">
                <b>{t('permalink')}: </b>
                {pattern.public ? (
                  <PageLink href={`/patterns/${pattern.id}`} txt={`/patterns/${pattern.id}`} />
                ) : (
                  <NoIcon className="w-4 h-4 text-error inline" />
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
    </div>
  )
}
