import { useTranslation } from 'next-i18next'
import Settings from './settings'
import Draft from '../draft'
import pluginBuilder from './plugin'

const addPages = (gist) => {
  const pages = []
}


const PrintLayout = props => {
  const { t } = useTranslation(['workbench'])

  const draft = new props.pattern(props.gist).use(pluginBuilder(
    props.gist?._state?.layout?.forPrinting?.page?.size,
    props.gist?._state?.layout?.forPrinting?.page?.orientation,
  ))
  let patternProps
  try {
    draft.draft()
    patternProps = draft.getRenderProps()
  } catch(err) {
    console.log(err)
  }
  const bgProps = { fill: "url(#page)" }

  return (
    <div>
      <h2 className="capitalize">
        {
          t('layoutThing', { thing: props.pattern.config.name })
          + ': '
          + t('forPrinting')
        }
      </h2>
      <div className="m-4">
        <Settings {...props} />
      </div>
      <Draft
        draft={draft}
        gist={props.gist}
        patternProps={patternProps}
        bgProps={bgProps}
      />
    </div>
  )
}

export default PrintLayout
