import { useState } from 'react'
import yaml from 'js-yaml'

export const SaveView = ({ Swizzled, state, update }) => {
  // Hooks
  //const backend = Swizzled.hooks.useBackend()
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
      router.push(
        editAfterSaveAs ? `/account/patterns/${design}/edit?id=${id}` : `/account/pattern?id=${id}`
      )
      if (editAfterSaveAs) setView('draft')
    } else setLoadingStatus([true, 'backendError', true, false])
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
          <button
            className={`${Swizzled.config.classes.horFlex} btn btn-primary btn-lg w-full mt-8`}
            onClick={saveAsNewPattern}
            title={t('pe:continueEditingDesc')}
          >
            <div className="flex flex-row items-center">
              <Swizzled.components.SaveAsIcon className="w-8 h-8" />
              <span className="opacity-60">→</span>
              <Swizzled.components.EditIcon className="w-6 h-6 opacity-60" />
            </div>
            <div className="flex flex-col gap-1 items-start">
              <span className="mt-2">{t('pe:saveAsNewPattern')}</span>
              <br />
              <span className="text-sm -mt-2 opacity-80 italic">
                & {t('pe:continueEditingTitle')}
              </span>
            </div>
          </button>
          <button
            className={`${Swizzled.config.classes.horFlex} btn btn-primary btn-lg w-full btn-outline mt-2 mb-8`}
            onClick={saveAsNewPattern}
            title={t('pe:goToPatternDesc')}
          >
            <div className="flex flex-row items-center">
              <Swizzled.components.SaveAsIcon className="w-8 h-8" />
              <span className="opacity-60">→</span>
              <Swizzled.components.DocsIcon className="w-6 h-6 opacity-60" />
            </div>
            <div className="flex flex-col gap-1 items-start">
              <span className="mt-2">{t('pe:saveAsNewPattern')}</span>
              <br />
              <span className="text-sm -mt-2 opacity-80 italic">& {t('pe:exitEditor')}</span>
            </div>
          </button>
        </div>
      </div>
    </Swizzled.components.AuthWrapper>
  )
}
