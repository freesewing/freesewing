import FabricSizer from './fabric-sizer'
import ClearIcon from 'shared/components/icons/clear'
import { useTranslation } from 'next-i18next'
import SheetIcon from 'shared/components/icons/sheet'

const CutLayoutSettings = props => {
  if (!props.gistReady) {return null}
  const { t } = useTranslation(['workbench'])

  const { gist, updateGist, unsetGist, length} = props

  return (
    <div className="my-2 flex flex-row gap-4 items-end justify-between">
      <FabricSizer {...props}/>
      <div className="flex flex-row font-bold items-center justify-center px-0 text-xl grow"><SheetIcon/> <span>&nbsp;{length}</span> </div>
      <button
          key="reset"
          onClick={() => unsetGist([props.layoutType])}
          className="btn btn-primary btn-outline"
        >
          <ClearIcon className="h-6 w-6 mr-2"/>
          {t('reset')}
        </button>
    </div>
  )
}

export default CutLayoutSettings
