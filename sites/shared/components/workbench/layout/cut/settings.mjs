import { ClearIcon } from 'shared/components/icons.mjs'
import { useTranslation } from 'next-i18next'

export const CutLayoutSettings = (props) => {
  const { t } = useTranslation(['workbench'])
  let fabric = props.draft?.setStores[0].get('fabric')
  if (!fabric) return null
  const { cols, rows, count } = fabric

  return (
    <div>
      <div
        className="flex flex-row justify-between
      mb-2"
      >
        <button
          key="reset"
          onClick={() => props.unsetGist(['layouts', 'cuttingLayout'])}
          className="btn btn-primary btn-outline"
        >
          <ClearIcon className="h-6 w-6 mr-2" />
          {t('reset')}
        </button>
      </div>
    </div>
  )
}
