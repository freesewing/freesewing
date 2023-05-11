import { useTranslation } from 'next-i18next'
import { svgattrPlugin } from '@freesewing/plugin-svgattr'
import { SvgWrapper } from './pattern/svg.mjs'
import { DraftError } from './pattern/error.mjs'

export const LabSample = ({ gist, draft, updateGist, unsetGist, showInfo, app, feedback }) => {
  const { t } = useTranslation(['workbench'])
  let svg
  let title = ''
  let patternProps
  const errors = []

  draft.use(svgattrPlugin, {
    class: 'freesewing pattern max-h-screen',
  })

  if (gist.sample) {
    try {
      draft = draft.sample()
      patternProps = draft.getRenderProps()
      // Render as React
      for (const logs of patternProps.logs.sets) errors.push(...logs.error)
    } catch (err) {
      console.log(err)
    }

    //FIXME this doesn't work for models
    title = t('testThing', {
      thing: ` : ${t(gist.sample.type)} : ${gist.sample[gist.sample.type]}`,
    })
  } else {
    // don't error on first page landing
    draft.draft()
    patternProps = draft.getRenderProps()
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
