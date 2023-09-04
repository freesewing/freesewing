// Dependencies
import { cloudflareImageUrl, nsMerge } from 'shared/utils.mjs'
// Context
import { LoadingStatusContext } from 'shared/context/loading-status-context.mjs'
// Hooks
import { useTranslation } from 'next-i18next'
import { useEffect, useState, useContext } from 'react'
import { useBackend } from 'shared/hooks/use-backend.mjs'
import { useRouter } from 'next/router'
// Components
import { AuthWrapper } from 'shared/components/wrappers/auth/index.mjs'
import { Loading } from 'shared/components/spinner.mjs'
import { DisplayRow } from 'shared/components/account/shared.mjs'
import { PageLink } from 'shared/components/link.mjs'
import Markdown from 'react-markdown'
import { Error404, ns as errNs } from 'shared/components/errors/404.mjs'
import { TrashIcon } from 'shared/components/icons.mjs'
import { Popout } from 'shared/components/popout/index.mjs'

export const ns = nsMerge('account', 'submissions', errNs)

export const CsetSubmissions = () => {
  const { t } = useTranslation(ns)
  const { setLoadingStatus, LoadingProgress } = useContext(LoadingStatusContext)
  const backend = useBackend()

  const [suggested, setSuggested] = useState([])
  const [selected, setSelected] = useState({})
  const [refresh, setRefresh] = useState(0)

  useEffect(() => {
    const loadSuggestedSets = async () => {
      setLoadingStatus([true, 'status:loadingData'])
      const result = await backend.getSuggestedSets()
      if (result.success) {
        setLoadingStatus([true, 'status:dataLoaded', true, true])
        setSuggested(result.data.suggested)
      } else setLoadingStatus([true, 'status:backendError', true, false])
    }
    loadSuggestedSets()
  }, [refresh])

  // Helper var to see how many are selected
  const selCount = Object.keys(selected).length

  // Helper method to toggle single selection
  const toggleSelect = (id) => {
    const newSelected = { ...selected }
    if (newSelected[id]) delete newSelected[id]
    else newSelected[id] = 1
    setSelected(newSelected)
  }

  // Helper method to toggle select all
  const toggleSelectAll = () => {
    if (selCount === suggested.length) setSelected({})
    else {
      const newSelected = {}
      for (const sug of suggested) newSelected[sug.id] = 1
      setSelected(newSelected)
    }
  }

  // Helper to delete one or more apikeys
  const removeSelectedSuggestions = async () => {
    let i = 0
    for (const key in selected) {
      i++
      await backend.removeSuggestedMeasurementsSet(key)
      setLoadingStatus([
        true,
        <LoadingProgress val={i} max={selCount} msg={t('removingRecords')} key="linter" />,
      ])
    }
    setSelected({})
    setRefresh(refresh + 1)
    setLoadingStatus([true, 'nailedIt', true, true])
  }

  if (suggested.length < 1)
    return (
      <Popout note>
        <h5>There are no suggested measurements sets</h5>
      </Popout>
    )

  return (
    <>
      {selCount ? (
        <button className="btn btn-error" onClick={removeSelectedSuggestions}>
          <TrashIcon /> {selCount} {t('curate:suggestedSets')}
        </button>
      ) : null}
      <table className="table table-auto">
        <thead className="border border-base-300 border-b-2 border-t-0 border-x-0">
          <tr className="b">
            <th className="text-base-300 text-base">
              <input
                type="checkbox"
                className="checkbox checkbox-secondary"
                onClick={toggleSelectAll}
                checked={suggested.length === selCount}
              />
            </th>
            <th className="text-base-300 text-base">{t('curate:img')}</th>
            <th className="text-base-300 text-base">{t('curate:name')}</th>
            <th className="text-base-300 text-base">{t('curate:user')}</th>
            <th className="text-base-300 text-base">{t('curate:set')}</th>
            <th className="text-base-300 text-base">{t('curate:height')}</th>
            <th className="text-base-300 text-base">{t('curate:createdAt')}</th>
          </tr>
        </thead>
        <tbody>
          {suggested.map((sug, i) => (
            <tr key={i}>
              <td className="text-base font-medium">
                <input
                  type="checkbox"
                  checked={selected[sug.id] ? true : false}
                  className="checkbox checkbox-secondary"
                  onClick={() => toggleSelect(sug.id)}
                />
              </td>
              <td className="text-base font-medium">
                <img
                  className="h-12 w-auto"
                  src={cloudflareImageUrl({ variant: 'w200', id: sug.data.img })}
                />
              </td>
              <td className="text-base font-medium">
                <PageLink href={`/curate/sets/suggested/${sug.id}`} txt={sug.data.name} />
              </td>
              <td className="text-base font-medium">
                <PageLink href={`/users/${sug.userId}`} txt={`/users/${sug.userId}`} />
              </td>
              <td className="text-base font-medium">
                <PageLink href={`/sets/${sug.data.set}`} txt={`/sets/${sug.data.set}`} />
              </td>
              <td className="text-base font-medium">{sug.data.height}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export const CsetSubmission = ({ id }) => {
  // Hooks
  const { t } = useTranslation(ns)
  const backend = useBackend()
  const { setLoadingStatus } = useContext(LoadingStatusContext)
  const router = useRouter()

  const [submission, setSubmission] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    const loadSubmission = async () => {
      setLoadingStatus([true, 'status:contactingBackend'])
      const result = await backend.loadConfirmation({ id, check: 'check' })
      if (result.success) {
        setLoadingStatus([true, 'status:dataLoaded', true, true])
        setSubmission(result.data.submission)
      } else {
        if (result.status === 404) setError(404)
        setLoadingStatus([true, 'status:backendError', true, false])
      }
    }
    if (id) loadSubmission()
  }, [id])

  const csetFromSuggestedSet = async () => {
    setLoadingStatus([true, 'status:contactingBackend'])
    const result = await backend.csetFromSuggestedSet(submission.id)
    console.log(result)
    if (result.success) {
      setLoadingStatus([true, 'status:nailedIt', true, true])
      router.push(`/curated-sets/${result.data.set.id}`)
    } else setLoadingStatus([true, 'backendError', true, false])
  }

  if (!id) return <Loading />

  if (error === 404) return <Error404 />

  return (
    <div className="max-w-2xl">
      <DisplayRow title={t('account:name')} keyWidth="w-48">
        {submission.name}
      </DisplayRow>
      <DisplayRow title={t('submissions:id')} keyWidth="w-48">
        <PageLink href={`/curate/sets/suggested/${submission.id}`} txt={submission.id} />
      </DisplayRow>
      <DisplayRow title={t('account:set')} keyWidth="w-48">
        <PageLink href={`/sets/${submission.set}`} txt={`/sets/${submission.set}`} />
      </DisplayRow>
      <DisplayRow title={t('account:height')} keyWidth="w-48">
        {submission.height}
      </DisplayRow>
      <DisplayRow title={t('account:notes')} keyWidth="w-48">
        <Markdown>{submission.notes}</Markdown>
      </DisplayRow>
      <DisplayRow title={t('account:image')} keyWidth="w-48">
        <img src={cloudflareImageUrl({ type: 'w500', id: submission.img })} />
      </DisplayRow>
      {submission.id && (
        <AuthWrapper role="curator">
          <button className="btn btn-primary w-full mt-4" onClick={csetFromSuggestedSet}>
            {t('submissions:convertToCset')}
          </button>
        </AuthWrapper>
      )}
    </div>
  )
}
