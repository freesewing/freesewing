import { SvgWrapper } from './svg.mjs'

export const Pattern = ({ pattern, setView, settings, ui, update }) => {
  if (!pattern) return <p>FIXME: no pattern</p>

  // Render as SVG
  return ui.renderer === 'svg' ? (
    <div dangerouslySetInnerHTML={{ __html: patern.render() }} />
  ) : (
    <SvgWrapper renderProps={pattern.getRenderProps()} {...{ update, settings, ui }} />
  )
}
