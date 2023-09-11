// Dependencies
import { capitalize, shortDate, notEmpty, horFlexClassesNoSm } from 'shared/utils.mjs'
import yaml from 'js-yaml'
// Context
import { LoadingStatusContext } from 'shared/context/loading-status-context.mjs'
// Hooks
import { useState, useContext } from 'react'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useBackend } from 'shared/hooks/use-backend.mjs'
// Components
import { AuthWrapper } from 'shared/components/wrappers/auth/index.mjs'
import { StringInput, MarkdownInput } from 'shared/components/inputs.mjs'
import { UploadIcon, EditIcon, PlusIcon, BookmarkIcon } from 'shared/components/icons.mjs'
import { Popout } from 'shared/components/popout/index.mjs'
import { PageLink } from 'shared/components/link.mjs'
import { DynamicOrgDocs } from 'site/components/dynamic-org-docs.mjs'

export const ns = ['workbench', 'status']

export const SaveView = ({ design, settings }) => {
  // Hooks
  const { t } = useTranslation(ns)
  const backend = useBackend()
  const router = useRouter()
  const { setLoadingStatus } = useContext(LoadingStatusContext)

  // State
  const [name, setName] = useState(`${capitalize(design)} / ${shortDate(router.locale)}`)
  const [withNotes, setWithNotes] = useState(false)
  const [notes, setNotes] = useState('')
  const [savedId, setSavedId] = useState()
  const [bookmarkedId, setBookmarkedId] = useState()

  // When we have more than 'new' this will come in handy
  //const action = router.asPath.split('/')[1]

  const addSettingsToNotes = () => {
    setNotes(notes + '\n```yaml\n' + yaml.dump(settings) + '````')
  }

  const savePattern = async () => {
    setLoadingStatus([true, 'savingPattern'])
    const patternData = { design, name, public: false, settings, data: {} }
    if (withNotes) patternData.notes = notes
    const result = await backend.createPattern(patternData)
    if (result.success) {
      const id = result.data.pattern.id
      setLoadingStatus([
        true,
        <>
          {t('status:patternSaved')} <small>[#{id}]</small>
        </>,
        true,
        true,
      ])
      setSavedId(id)
    } else setLoadingStatus([true, 'backendError', true, false])
  }

  const bookmarkPattern = async () => {
    setLoadingStatus([true, 'creatingBookmark'])
    const result = await backend.createBookmark({
      type: 'pattern',
      title: name,
      url: window.location.pathname + window.location.search + window.location.hash,
    })
    if (result.success) {
      const id = result.data.bookmark.id
      setLoadingStatus([
        true,
        <>
          {t('status:bookmarkCreated')} <small>[#{id}]</small>
        </>,
        true,
        true,
      ])
      setBookmarkedId(id)
    } else setLoadingStatus([true, 'backendError', true, false])
  }

  return (
    <AuthWrapper>
      <div className="m-auto mt-8 max-w-2xl px-4">
        <h2>{t('workbench:savePattern')}</h2>
        {savedId && (
          <Popout link>
            <h5>{t('workbend:patternSaved')}</h5>
            {t('workbench:see')}:{' '}
            <PageLink href={`/account/patterns/${savedId}`} txt={`/account/patterns/${savedId}`} />
          </Popout>
        )}
        {bookmarkedId && (
          <Popout link>
            <h5>{t('workbench:patternBookmarkCreated')}</h5>
            {t('workbench:see')}:{' '}
            <PageLink
              href={`/account/bookmarks/${bookmarkedId}`}
              txt={`/account/bookmarks/${bookmarkedId}`}
            />
          </Popout>
        )}
        <div className="mb-4">
          <StringInput
            label={t('workbench:name')}
            current={name}
            update={setName}
            valid={notEmpty}
            docs={<DynamicOrgDocs language={router.locale} path={`site/patterns/name`} />}
          />
          {withNotes ? (
            <MarkdownInput
              label={t('workbench:notes')}
              current={notes}
              update={setNotes}
              docs={<DynamicOrgDocs language={router.locale} path={`site/patterns/notes`} />}
            />
          ) : null}
        </div>
        <button
          className={`${horFlexClassesNoSm} btn btn-primary w-full mt-2`}
          onClick={savePattern}
        >
          <UploadIcon />
          {t('workbench:savePattern')}
        </button>
        <div className="grid md:grid-cols-2 gap-2 mt-4">
          {withNotes ? (
            <button
              className={`${horFlexClassesNoSm} btn btn-primary btn-outline`}
              onClick={addSettingsToNotes}
            >
              <PlusIcon />
              {t('workbench:addSettingsToNotes')}
            </button>
          ) : (
            <button
              className={`${horFlexClassesNoSm} btn btn-primary btn-outline`}
              onClick={() => setWithNotes(true)}
            >
              <EditIcon />
              {t('workbench:addNotes')}
            </button>
          )}
          <button
            className={`${horFlexClassesNoSm} btn btn-primary btn-outline w-full`}
            onClick={bookmarkPattern}
          >
            <BookmarkIcon />
            {t('workbench:bookmarkPattern')}
          </button>
        </div>
      </div>
    </AuthWrapper>
  )
}
