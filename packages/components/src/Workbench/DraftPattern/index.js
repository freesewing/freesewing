import React from 'react'
import Draft from '../../Draft'
import fileSaver from 'file-saver'
import theme from '@freesewing/plugin-theme'
import Events from './Events'

const DraftPattern = (props) => {
  const svgToFile = (svg) => {
    const blob = new Blob([svg], {
      type: 'image/svg+xml;charset=utf-8'
    })
    fileSaver.saveAs(blob, 'freesewing-' + props.config.name + '.svg')
  }

  if (props.svgExport) {
    svgToFile(
      new props.Pattern({
        ...props.gist.settings,
        embed: false
      })
        .use(theme)
        .draft()
        .render()
    )
    props.setSvgExport(false)
  }

  let focusCount = 0
  if (props.focus !== null) {
    for (let p of Object.keys(props.focus)) {
      for (let i in props.focus[p].points) focusCount++
      for (let i in props.focus[p].paths) focusCount++
      for (let i in props.focus[p].coords) focusCount++
    }
  }

  return (
    <>
      <Events events={props.patternProps.events} types={['info']} />
      <Draft
        {...props.patternProps}
        design={props.design}
        focus={props.focus}
        raiseEvent={props.raiseEvent}
        viewBox={props.viewBox}
        className="freesewing draft pattern shadow"
      />
      <Events events={props.patternProps.events} />
    </>
  )
}

export default DraftPattern
