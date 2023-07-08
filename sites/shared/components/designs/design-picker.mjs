import { designs } from 'shared/config/designs.mjs'
import { Design, ns as designNs } from 'shared/components/designs/design.mjs'
import { useTranslation } from 'next-i18next'

export const ns = designNs

export const DesignPicker = ({ hrefBuilder = false }) => {
  const { t } = useTranslation('designs')

  // Need to sort designs by their translated title
  const translated = {}
  for (const d in designs) translated[t(`${d}.t`)] = d

  return (
    <div className="flex flex-row flex-wrap gap-2">
      {Object.keys(translated)
        .sort()
        .map((d) => (
          <Design name={translated[d]} key={d} hrefBuilder={hrefBuilder} />
        ))}
    </div>
  )
}
