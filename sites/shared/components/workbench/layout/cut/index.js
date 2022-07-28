import { useTranslation } from 'next-i18next'
import Settings from './settings'

const CutLayout = props => {
  const { t } = useTranslation(['workbench'])

  return (
    <div>
      <h2 className="capitalize">
        {
          t('layoutThing', { thing: props.design.config.name })
          + ': '
          + t('forCutting')
        }
      </h2>
      <Settings {...props} />
    </div>
  )
}

export default CutLayout
