import FabricSizer from './fabric-sizer'
import ClearIcon from 'shared/components/icons/clear'
import { useTranslation } from 'next-i18next'
import SheetIcon from 'shared/components/icons/sheet'

const CutLayoutSettings = props => {
  if (!props.gistReady) {return null}
  const { t } = useTranslation(['workbench'])

  const { unsetGist, length, gist, updateGist} = props

  const fabricType = gist._state?.layout?.forCutting?.fabricType || 'cut'

  const setFabricType = (type) => updateGist(['_state', 'layout', 'forCutting', "fabricType"], type)

  return (
    <div className="my-2 flex flex-row gap-4 items-end justify-between">
      <FabricSizer {...props}/>
      <div className="form-control">
        <label className="label cursor-pointer">
          <input type="radio" name="radio-6" className="radio" onChange={() => setFabricType('cut')} checked={'cut' === fabricType} />
          <span className="label-text">Main</span>
        </label>
      </div>
      <div className="form-control">
        <label className="label cursor-pointer">
          <input type="radio" name="radio-6" className="radio" onChange={() => setFabricType('lining')} checked={'lining' === fabricType} />
          <span className="label-text">Lining</span>
        </label>
      </div>
      <div className="form-control">
        <label className="label cursor-pointer">
          <input type="radio" name="radio-6" className="radio" onChange={() => setFabricType('interfacing')} checked={'interfacing' === fabricType} />
          <span className="label-text">Interfacing</span>
        </label>
      </div>
      <div className="flex flex-row font-bold items-center justify-center px-0 text-xl grow"><SheetIcon/> <span>&nbsp;{length}</span> </div>
      <button
        key="reset"
        onClick={() => unsetGist(['layouts', props.layoutType])}
        className="btn btn-primary btn-outline"
      >
        <ClearIcon className="h-6 w-6 mr-2"/>
        {t('reset')}
      </button>
    </div>
  )
}

export default CutLayoutSettings
