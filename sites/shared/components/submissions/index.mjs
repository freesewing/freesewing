// Dependencies
import { cloudflareImageUrl, nsMerge } from 'shared/utils.mjs'
// Hooks
import { useTranslation } from 'next-i18next'
import { useEffect, useState } from 'react'
import { useBackend } from 'shared/hooks/use-backend.mjs'
import { useLoadingStatus } from 'shared/hooks/use-loading-status.mjs'
import { useRouter } from 'next/router'
// Components
import { AuthWrapper } from 'shared/components/wrappers/auth/index.mjs'
import { Loading } from 'shared/components/spinner.mjs'
import { DisplayRow } from 'shared/components/account/shared.mjs'
import { PageLink } from 'shared/components/link.mjs'
import Markdown from 'react-markdown'
import { Error404, ns as errNs } from 'shared/components/errors/404.mjs'

export const ns = nsMerge('account', 'submissions', errNs)

export const CsetSubmission = ({ id }) => {
  // Hooks
  const { t } = useTranslation(ns)
  const backend = useBackend()
  const { setLoadingStatus, LoadingStatus } = useLoadingStatus()
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
