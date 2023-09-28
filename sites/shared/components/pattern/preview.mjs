import { useDesign } from 'site/hooks/use-design.mjs'
import { Popout } from 'shared/components/popout/index.mjs'
import { themePlugin } from '@freesewing/plugin-theme'
import { Pattern as ReactPattern } from 'pkgs/react-components/src/index.mjs'
import { useTranslation } from 'next-i18next'

export const ns = ['account', 'patterns', 'status']

export const PatternSvgPreview = ({ design, settings }) => {
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

export const PatternReactPreview = ({ design, settings }) => {
  const { t } = useTranslation([design])
  const Pattern = useDesign(design)
  if (!Pattern) return <Popout warning>not a valid pattern constructor for {design}</Popout>

  let draft, renderProps
  try {
    draft = new Pattern({ ...settings, embed: true }).draft()
    renderProps = draft.getRenderProps()
  } catch (err) {
    console.log(err)
  }

  return (
    <ReactPattern
      t={t}
      renderProps={renderProps}
      className="freesewing pattern p-4 shadow border border-solid text-base-content bg-base-100 w-full"
    />
  )
}
