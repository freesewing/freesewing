import { useTranslation } from 'next-i18next'
import { svgattrPlugin } from '@freesewing/plugin-svgattr'
import { SvgWrapper } from './draft/svg.mjs'
import { DraftError } from './draft/error.mjs'

export const LabSample = ({ gist, draft, updateGist, unsetGist, showInfo, app, feedback }) => {
  const { t } = useTranslation(['workbench'])
  let svg
  let title = ''
  let patternProps
  const errors = []
  if (gist.sample) {
    try {
      draft.use(svgattrPlugin, {
        class: 'freesewing pattern max-h-screen',
      })
      draft = draft.sample()
      // Render as React
      patternProps = draft.getRenderProps()
      for (const logs of patternProps.logs) errors.push(...logs.error)
    } catch (err) {
      console.log(err)
    }
    if (gist.sample.type === 'option') {
      title = t('testThing', {
        thing: ' : ' + t('option') + ' : ' + gist.sample.option,
      })
    }
  }

  return (
    <>
      <h2>{title}</h2>
      {!patternProps || errors.length > 0 ? (
        <DraftError {...{ draft, patternProps, updateGist, errors }} />
      ) : null}
      <SvgWrapper
        {...{ draft, patternProps, gist, updateGist, unsetGist, showInfo, app, feedback }}
      />
      <div className="freesewing pattern" dangerouslySetInnerHTML={{ __html: svg }} />
    </>
  )
}
