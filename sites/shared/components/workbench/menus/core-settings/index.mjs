import { SettingsIcon } from 'shared/components/icons.mjs'
import { Chevron } from 'shared/components/navigation/primary.mjs'
import { Setting } from './setting.mjs'
import { Ul, Details, TopSummary, TopSumTitle } from '../index.mjs'
import { useTranslation } from 'next-i18next'

export const settings = {
  paperless: {
    dflt: false,
  },
  saBool: {
    dflt: false,
  },
  saMm: {
    min: 0,
    max: 25,
    dflt: 10,
  },
  complete: {
    dflt: false,
  },
  only: {},
  locale: {
    list: ['de', 'en', 'es', 'fr', 'nl'],
  },
  units: {
    list: ['metric', 'imperial'],
  },
  margin: {
    min: 0,
    max: 25,
    dflt: 2,
  },
  scale: {
    min: 0.1,
    max: 5,
    dflt: 1,
  },
  renderer: {
    list: ['react', 'svg'],
    titles: {
      react: '<Draft /> (React)',
      svg: '@freesewing/core (SVG)',
    },
  },
  debug: {
    dflt: false,
  },
}

export const CoreSettings = ({ design, update, settings }) => {
  // FIXME: Update this namespace
  const { t } = useTranslation(['app'])

  return (
    <Details open>
      <TopSummary icon={<SettingsIcon />}>
        <TopSumTitle>{t('settings')}</TopSumTitle>
        <Chevron />
      </TopSummary>
      <Ul>
        {Object.keys(settings).map((name) => (
          <Setting key={name} {...{ name, design, t }} config={settings[name]} />
        ))}
      </Ul>
    </Details>
  )
}
