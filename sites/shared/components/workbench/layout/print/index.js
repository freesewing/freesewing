import { useEffect } from 'react'
import { useTranslation } from 'next-i18next'
import Settings from './settings'
import Draft from '../draft/index'
import pluginBuilder from './plugin'

const PrintLayout = props => {

  useEffect(() => {
    if (props.gist?._state?.xray?.enabled) props.updateGist(
      ['_state', 'xray', 'enabled'],
      false
    )
  }, [])

  const { t } = useTranslation(['workbench'])

  const draft = new props.design(props.gist).use(pluginBuilder(
    props.gist?._state?.layout?.forPrinting?.page?.size,
    props.gist?._state?.layout?.forPrinting?.page?.orientation,
  ))
  let patternProps
  try {
    draft.draft()
    patternProps = draft.getRenderProps()
  } catch(err) {
    console.log(err, props.gist)
  }
  const bgProps = { fill: "url(#page)" }

  return (
    <div>
      <h2 className="capitalize">
        {
          t('layoutThing', { thing: props.design.config.name })
          + ': '
          + t('forPrinting')
        }
      </h2>
      <div className="m-4">
        <Settings {...props} draft={draft}/>
      </div>
      <Draft
        draft={draft}
        gist={props.gist}
        updateGist={props.updateGist}
        patternProps={patternProps}
        bgProps={bgProps}
        gistReady={props.gistReady}
      />
    </div>
  )
}

export default PrintLayout
