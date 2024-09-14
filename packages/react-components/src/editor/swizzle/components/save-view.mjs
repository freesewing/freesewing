import { useState } from 'react'
import yaml from 'js-yaml'

export const SaveView = ({ Swizzled, state, update }) => {
  // Hooks
  const backend = Swizzled.hooks.useBackend()
  const { t } = Swizzled.methods

  // State
  const [name, setName] = useState(
    `${Swizzled.methods.capitalize(state.design)} / ${Swizzled.methods.shortDate(status.locale)}`
  )
  const [withNotes, setWithNotes] = useState(false)
  const [notes, setNotes] = useState('')
  const [savedId, setSavedId] = useState()
  const [bookmarkedId, setBookmarkedId] = useState()
  const [editAfterSaveAs, setEditAfterSaveAs] = useState(true)
  const [saveAs, setSaveAs] = useState(false)
  const [settingsAdded, setSettingsAdded] = useState(false)

  const addSettingsToNotes = () => {
    setNotes(
      notes +
        '\n\n#### ' +
        Swizzled.methods.t('pe:settings') +
        '\n\n' +
        '```yaml\n' +
        yaml.dump(state.settings) +
        '````'
    )
    setSettingsAdded(true)
  }

  const saveAsNewPattern = async () => {
    const loadingId = 'savePatternAs'
    update.startLoading(loadingId)
    const patternData = {
      design: state.design,
      name,
      public: false,
      settings: state.settings,
      data: {},
    }
    if (withNotes) patternData.notes = notes
    const result = await backend.createPattern(patternData)
    if (result.success) {
      const id = result.data.pattern.id
      update.stopLoading(loadingId)
      update.view('draft')
      update.notifySuccess(
        <span>
          {t('pe:patternSavedAs')}:{' '}
          <Swizzled.components.Link
            href={`/account/pattern?id=${id}`}
            className={`${Swizzled.config.classes.link} text-secondary-content`}
          >
            /account/pattern?id={id}
          </Swizzled.components.Link>
        </span>,
        id
      )
    } else update.notifyFailure('oops', id)
  }

  const savePattern = async () => {
    setLoadingStatus([true, 'savingPattern'])
    const patternData = { design, name, public: false, settings, data: {} }
    const result = await backend.updatePattern(saveAs.pattern, patternData)
    if (result.success) {
      setLoadingStatus([
        true,
        <>
          {t('status:patternSaved')} <small>[#{saveAs.pattern}]</small>
        </>,
        true,
        true,
      ])
      setSavedId(saveAs.pattern)
      update.notify({ color: 'success', msg: 'boom' }, saveAs.pattern)
    } else setLoadingStatus([true, 'backendError', true, false])
  }

  //const bookmarkPattern = async () => {
  //  setLoadingStatus([true, 'creatingBookmark'])
  //  const result = await backend.createBookmark({
  //    type: 'pattern',
  //    title: name,
  //    url: window.location.pathname + window.location.search + window.location.hash,
  //  })
  //  if (result.success) {
  //    const id = result.data.bookmark.id
  //    setLoadingStatus([
  //      true,
  //      <>
  //        {t('status:bookmarkCreated')} <small>[#{id}]</small>
  //      </>,
  //      true,
  //      true,
  //    ])
  //    setBookmarkedId(id)
  //  } else setLoadingStatus([true, 'backendError', true, false])
  //}

  return (
    <Swizzled.components.AuthWrapper>
      <Swizzled.components.HeaderMenu {...{ state, update }} />
      <div className="m-auto mt-8 max-w-2xl px-4">
        {saveAs && saveAs.pattern ? (
          <>
            <h2>{t('pe:savePattern')}</h2>
            {savedId && (
              <Popout link>
                <h5>{t('workbend:patternSaved')}</h5>
                {t('pe:see')}:{' '}
                <PageLink
                  href={`/account/patterns/${savedId}`}
                  txt={`/account/patterns/${savedId}`}
                />
              </Popout>
            )}
            <button
              className={`${Swizzled.config.classeshorFlexNoSm} btn btn-primary btn-lg w-full mt-2 my-8`}
              onClick={savePattern}
            >
              <SaveIcon className="h-8 w-8" />
              {t('pe:savePattern')} #{saveAs.pattern}
            </button>
          </>
        ) : null}
        <h2>{t('pe:saveAsNewPattern')}</h2>
        {bookmarkedId && (
          <Popout link>
            <h5>{t('pe:patternBookmarkCreated')}</h5>
            {t('pe:see')}:{' '}
            <PageLink
              href={`/account/bookmarks/${bookmarkedId}`}
              txt={`/account/bookmarks/${bookmarkedId}`}
            />
          </Popout>
        )}
        <div className="mb-4">
          <Swizzled.components.StringInput
            label={t('pe:patternTitle')}
            current={name}
            update={setName}
            valid={Swizzled.methods.notEmpty}
            labelBR={
              <>
                {withNotes ? (
                  <div className="flex flex-row items-center gap-4">
                    <button
                      className={`font-bold ${Swizzled.config.classes.link}`}
                      onClick={() => setWithNotes(false)}
                    >
                      {t('pe:hideNotes')}
                    </button>
                    <button
                      className={`font-bold ${Swizzled.config.classes.link}`}
                      onClick={addSettingsToNotes}
                    >
                      {t('pe:addSettingsToNotes')}
                    </button>
                  </div>
                ) : (
                  <button
                    className={`font-bold ${Swizzled.config.classes.link}`}
                    onClick={() => setWithNotes(true)}
                  >
                    {t('pe:addNotes')}
                  </button>
                )}
              </>
            }
          />
          {withNotes ? (
            <Swizzled.components.MarkdownInput
              label={t('pe:patternNotes')}
              current={notes}
              update={setNotes}
            />
          ) : null}
          <div className="flex flex-row gap-2 mt-8">
            <button
              className={`btn btn-primary btn-lg btn-outline`}
              onClick={update.viewBack}
              title={t('pe:cancel')}
            >
              <span>{t('pe:cancel')}</span>
            </button>
            <button
              className={`flex flex-row items-center justify-between btn btn-primary btn-lg grow`}
              onClick={saveAsNewPattern}
              title={t('pe:saveAsNewPattern')}
            >
              <Swizzled.components.SaveAsIcon className="w-8 h-8" />
              <span>{t('pe:saveAsNewPattern')}</span>
            </button>
          </div>
          <p className="text-sm text-right">
            To access your saved patterns, go to:{' '}
            <b>
              <Swizzled.components.PageLink href="//account/patterns">
                /account/patterns
              </Swizzled.components.PageLink>
            </b>
          </p>
        </div>
      </div>
    </Swizzled.components.AuthWrapper>
  )
}
