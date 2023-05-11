import { SvgWrapper } from './svg.mjs'

export const Pattern = ({ pattern, setView, settings, ui, update }) => {
  if (!pattern) return null

  // Render as SVG
  return ui.renderer === 'svg' ? (
    <div dangerouslySetInnerHTML={{ __html: patern.render() }} />
  ) : (
    <SvgWrapper {...pattern.getRenderProps()} />
  )
}
