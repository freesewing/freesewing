import SvgWrapper from './draft/svg-wrapper'
import Error from './draft/error.js'
import { svgattrPlugin } from '@freesewing/plugin-svgattr'
import { useTranslation } from 'next-i18next'

const LabSample = ({ gist, draft, updateGist, unsetGist, showInfo, app, feedback }) => {

  const { t } = useTranslation(['workbench'])
  let svg
  let title = ''
  let patternProps
  const errors = []
  if (gist.sample) {
    try {
      draft.use(svgattrPlugin, {
        class: 'freesewing pattern max-h-screen'
      })
      draft = draft.sample()
      // Render as React
      patternProps = draft.getRenderProps()
      for (const logs of patternProps.logs) errors.push(...logs.error)
    }
    catch(err) {
      console.log(err)
    }
    if (gist.sample.type === 'option') {
      title = t('testThing', {
        thing: ' : ' + t('option') + ' : ' + gist.sample.option
      })
    }
  }

  return (
    <>
      <h2>{title}</h2>
      {!patternProps || errors.length > 0 ? (
        <Error {...{ draft, patternProps, updateGist }} />
      ) : null}
      <SvgWrapper
        {...{ draft, patternProps, gist, updateGist, unsetGist, showInfo, app, feedback }}
      />
      <div className="freesewing pattern" dangerouslySetInnerHTML={{__html: svg}} />
    </>
  )
}

export default LabSample
