// Dependencies
import { capitalize, shortDate } from 'shared/utils.mjs'
// Hooks
import { useState, useContext } from 'react'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useAccount } from 'shared/hooks/use-account.mjs'
import { useBackend } from 'shared/hooks/use-backend.mjs'
import { useToast } from 'shared/hooks/use-toast.mjs'
// Context
import { LoadingContext } from 'shared/context/loading-context.mjs'
// Components
import { Spinner } from 'shared/components/spinner.mjs'

export const ns = ['wbsave']

const whereAreWe = (router = false, design) => {
  const info = {}
  if (router?.asPath) {
    const chunks = router.asPath.split('/')
    info.new = chunks[1] === 'new'
    info.design = chunks[3]
    info.from = chunks[4]
    info.fromId = chunks[5].split('#').shift()
    info.locale = router.locale
  }
  if (info.design !== design) throw 'Design passed to view does not match URL state'

  return info
}

const defaultName = (info) =>
  `${capitalize(info.design)} / ${info.from}-${info.fromId} / ${shortDate(info.locale)}`

const SaveNewPattern = ({
  t,
  design,
  settings,
  info,
  backend,
  loading,
  startLoading,
  stopLoading,
  toast,
  router,
}) => {
  // State
  const [name, setName] = useState(defaultName(info))

  const update = async (evt) => {
    evt.preventDefault()
    if (evt.target.value !== name) setName(evt.target.value)
  }

  const save = async () => {
    startLoading()
    const data = {
      data: {},
      design,
      name,
      settings,
    }
    if (data.settings.measurements) delete data.settings.measurements
    if (data.settings.embed) delete data.settings.embed
    if (info.from === 'set' && info.fromId) data.set = Number(info.fromId)
    else if (info.from === 'cset' && info.fromId) data.cset = Number(info.fromId)
    else return toast.error(<span>¯\_(ツ)_/¯</span>)

    const result = await backend.createPattern(data)
    if (result.success) {
      toast.for.settingsSaved()
      router.push(`/patterns/${result.data.pattern.id}`)
    } else toast.for.backendError()
    stopLoading()
  }

  return (
    <div className="max-w-sm w-full">
      <h2>Save to your FreeSewing account</h2>
      <label className="font-bold">{t('wbsave:giveItAName')}</label>
      <input
        value={name}
        onChange={update}
        className="input w-full input-bordered flex flex-row"
        type="text"
        placeholder={t('title')}
      />
      <button className="btn mt-4 capitalize btn-primary w-full" onClick={save}>
        <span className="flex flex-row items-center gap-2">
          {loading ? (
            <>
              <Spinner />
              <span>{t('processing')}</span>
            </>
          ) : (
            t('save')
          )}
        </span>
      </button>
    </div>
  )
}

export const SaveView = ({ design, setView, settings, ui, update, language, DynamicDocs }) => {
  // Hooks
  const { t } = useTranslation(ns)
  const { token } = useAccount()
  const backend = useBackend(token)
  const router = useRouter()
  const toast = useToast()
  // Context
  const { loading, startLoading, stopLoading } = useContext(LoadingContext)

  const info = whereAreWe(router, design)

  return (
    <div className="m-auto mt-24">
      <h1 className="max-w-6xl m-auto text-center">{t('wbsave:title')}</h1>
      <div className="px-4 lg:px-12 flex flex-row flex-wrap gap-4 lg:gap-8 justify-around">
        {info.new ? (
          <SaveNewPattern
            {...{
              t,
              design,
              settings,
              info,
              backend,
              loading,
              startLoading,
              stopLoading,
              toast,
              router,
            }}
          />
        ) : null}
      </div>
    </div>
  )
}
