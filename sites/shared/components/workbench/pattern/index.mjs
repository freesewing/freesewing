import { SvgWrapper } from './svg.mjs'

export const Pattern = ({ pattern, settings, ui, update }) => {
  if (!pattern) return <p>FIXME: no pattern</p>

  // Render as SVG
  return ui.renderer === 'svg' ? (
    <div dangerouslySetInnerHTML={{ __html: pattern.render() }} />
  ) : (
    <SvgWrapper renderProps={pattern.getRenderProps()} {...{ update, settings, ui }} />
  )
}
