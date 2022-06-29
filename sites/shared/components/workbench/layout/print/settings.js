import PageSizePicker from './pagesize-picker'
import OrientationPicker from './orientation-picker'
import PrintIcon from 'shared/components/icons/print'
import RightIcon from 'shared/components/icons/right'
import ClearIcon from 'shared/components/icons/clear'
import { useTranslation } from 'next-i18next'

const PrintLayoutSettings = props => {
  if (!props.draft?.parts?.pages?.pages) return null
  const { cols, rows, count } = props.draft.parts.pages.pages
  const { t } = useTranslation(['workbench'])

  return (
    <div className="flex flex-row gap-8 justify-center">
      <PageSizePicker {...props} />
      <OrientationPicker {...props} />
      <div className="flex flex-row font-bold items-center px-0 text-xl">
        <PrintIcon />
        <span className="ml-2">{count}</span>
        <span className="mx-6 opacity-50">|</span>
        <RightIcon />
        <span className="ml-2">{cols}</span>
        <span className="mx-6 opacity-50">|</span>
        <div className="rotate-90"><RightIcon /></div>
        <span className="text-xl ml-2">{rows}</span>
      </div>
      <button
        key="reset"
        onClick={() => props.unsetGist('layout')}
        className="btn btn-primary btn-outline"
      >
        <ClearIcon className="h-6 w-6 mr-2"/>
        {t('reset')}
      </button>
    </div>
  )
}

export default PrintLayoutSettings
