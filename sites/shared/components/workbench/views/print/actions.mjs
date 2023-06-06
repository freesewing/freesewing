import { useTranslation } from 'next-i18next'
import { ClearIcon, ExportIcon } from 'shared/components/icons.mjs'
import { ShowButtonsToggle } from 'shared/components/workbench/pattern/movable/transform-buttons.mjs'

export const ns = ['workbench', 'print']

export const PrintActions = ({ update, ui, exportIt }) => {
  // get translation for the menu
  const { t } = useTranslation(ns)

  const resetLayout = () => update.ui(['layouts', 'print'])

  return (
    <div className="mt-2 mb-4">
      <div className="flex justify-evenly flex-col lg:flex-row">
        <ShowButtonsToggle update={update} ui={ui} />
        <button className="btn btn-primary btn-outline" onClick={resetLayout}>
          <ClearIcon />
          <span className="ml-2">{t('reset')}</span>
        </button>
        <button className="btn btn-primary" onClick={exportIt}>
          <ExportIcon />
          <span className="ml-2">{t('export')}</span>
        </button>
      </div>
    </div>
  )
}
