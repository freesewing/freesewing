import { useTranslation } from 'next-i18next'

// FIXME: I feel this should be kept closer to where it's used

export const ResetButtons = ({ resetGist, undoGist }) => {
  const { t } = useTranslation(['app'])

  return (
    <div className="flex flex-row gap-4 my-4">
      <button className="btn btn-primary" onClick={undoGist}>
        {t('undo')}
      </button>
      <button className="btn btn-primary" onClick={resetGist}>
        {t('reset_all')}
      </button>
    </div>
  )
}
