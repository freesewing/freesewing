import { useDesign } from 'shared/hooks/use-design.mjs'
import { Popout } from 'shared/components/popout.mjs'
import { themePlugin } from '@freesewing/plugin-theme'

export const PatternPreview = ({ design, settings }) => {
  const Pattern = useDesign(design)
  if (!Pattern) return <Popout warning>not a valid pattern constructor for {design}</Popout>

  let pattern, svg

  try {
    pattern = new Pattern({ ...settings, embed: true }).use(themePlugin).draft()
    svg = pattern.render()
  } catch (err) {
    console.log(err)
  }

  return <figure dangerouslySetInnerHTML={{ __html: svg }} />
}
