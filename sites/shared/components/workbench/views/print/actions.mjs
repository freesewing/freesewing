import { WorkbenchMenu } from 'shared/components/workbench/menus/shared/index.mjs'
import { MenuItem } from 'shared/components/workbench/menus/shared/menu-item.mjs'
import { BoolInput } from 'shared/components/workbench/menus/shared/inputs.mjs'
import { ListValue } from 'shared/components/workbench/menus/shared/values.mjs'
import { useTranslation } from 'next-i18next'
import { ClearIcon, ExportIcon } from 'shared/components/icons.mjs'
const handlers = {
  showMovableButtons: (update) => (_path, newVal) => update.ui('showMovableButtons', newVal),
}

export const ns = ['workbench', 'print']

const config = {
  showMovableButtons: {
    dflt: true,
  },
}

const PrintActionItem = ({ name, config, settings, ui, updateFunc, passProps, ...rest }) => {
  switch (name) {
    case 'showMovableButtons':
      return
  }
}

export const PrintActions = ({ update, settings, ui, account, exportIt }) => {
  // get translation for the menu
  const { t } = useTranslation(ns)

  const hideButtons = (evt) => {
    update.ui('hideMovableButtons', !evt.target.checked)
  }

  const resetLayout = () => update.ui(['layouts', 'print'])

  return (
    <div className="mt-2 mb-4">
      <div className="flex justify-evenly flex-col lg:flex-row">
        <label className="label cursor-pointer">
          <span className="label-text text-lg mr-2">{t('showMovableButtons')}</span>
          <input
            type="checkbox"
            className="toggle toggle-primary"
            checked={!ui.hideMovableButtons}
            onChange={hideButtons}
          />
        </label>
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
