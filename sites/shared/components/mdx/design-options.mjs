import { useTranslation } from 'next-i18next'
import { useDesign } from 'site/hooks/use-design.mjs'
import { SimpleOptionsList } from 'shared/components/designs/info.mjs'

export const DesignOptions = ({ design }) => {
  const { t } = useTranslation([design])
  const Design = useDesign(design)
  const config = Design.patternConfig

  return <SimpleOptionsList options={config.options} t={t} design={design} />
}
