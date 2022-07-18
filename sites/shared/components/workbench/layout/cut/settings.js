import FabricSizer from './fabric-sizer'
import ClearIcon from 'shared/components/icons/clear'
import { useTranslation } from 'next-i18next'
import SheetIcon from 'shared/components/icons/sheet'

const CutLayoutSettings = props => {
  if (!props.gistReady) {return null}
  const { t } = useTranslation(['workbench'])

  const { unsetGist, length, gist, updateGist, draft} = props

  const fabricType = gist._state?.layout?.forCutting?.fabricType || 'cut'
  const fabricTypes = []
  Object.values(props.draft.cutList()).forEach((c) => {
    Object.keys(c).forEach((f) => {
      if (typeof c[f] === 'number' && fabricTypes.indexOf(f) === -1) fabricTypes.push(f)
    })
  })

  const setFabricType = (type) => updateGist(['_state', 'layout', 'forCutting', "fabricType"], type)

  return (
    <div className="my-2 flex flex-row gap-4 items-end justify-between">
      <FabricSizer {...props}/>
        { fabricTypes.length === 1 ? '' :
          fabricTypes.map((f) => (<div className="form-control flex flex-row gap-1 items-center" key={f}>
            <input type="radio" name="radio-6" className="radio" onChange={() => setFabricType(f)} checked={f === fabricType} />
            <label className="label cursor-pointer">
              <span className="label-text">{t(`fabricType:${f}`)}</span>
            </label>
          </div>))
        }

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
