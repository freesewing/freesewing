import FabricSizer from './fabric-sizer'
import ClearIcon from 'shared/components/icons/clear'
import { useTranslation } from 'next-i18next'

const CutLayoutSettings = props => {
  if (!props.gistReady) {return null}
  const { t } = useTranslation(['workbench'])

  const { gist, updateGist, unsetGist} = props

  return (
    <div>
      <FabricSizer gist={gist} updateGist={updateGist}/>
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
