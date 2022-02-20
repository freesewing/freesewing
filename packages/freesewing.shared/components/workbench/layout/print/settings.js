import { useTranslation } from 'next-i18next'
import PageSizePicker from './pagesize-picker'
import OrientationPicker from './orientation-picker'

const PrintLayoutSettings = props => {
  const settingsProps = {
    gist: props.gist,
    updateGist: props.updateGist
  }

  return (
    <div className="flex flex-row gap-4 justify-center">
      <PageSizePicker {...props} />
      <OrientationPicker {...props} />
      <pre>{JSON.stringify(props.gist._state, null ,2)}</pre>
    </div>
  )
}

export default PrintLayoutSettings
