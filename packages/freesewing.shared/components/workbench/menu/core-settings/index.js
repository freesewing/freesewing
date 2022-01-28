import SettingsIcon from 'shared/components/icons/settings.js'
import { linkClasses, Chevron } from 'shared/components/navigation/primary.js'
import Setting from './setting.js'

const settings = {
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
  renderer: {
    list: ['react', 'svg'],
    titles: {
      react: '<Draft /> (React)',
      svg: '@freesewing/core (SVG)'
    }
  },
}

const CoreSettings = props => {

  return (
    <details className='py-1' open>
      <summary className={`
        flex flex-row uppercase gap-4 font-bold text-lg
        hover:cursor-row-resize
        p-2
        text-base-content
        sm:text-neutral-content
        items-center
      `}>
        <span className="text-secondary-focus mr-4"><SettingsIcon /></span>
        <span className={`grow ${linkClasses} hover:cursor-resize`}>
          {props.app.t('app.settings')}
        </span>
        <Chevron />
      </summary>
      <ul className="pl-5 list-inside">
        {Object.keys(settings).map(setting => (
          <Setting key={setting} setting={setting} config={settings[setting]} {...props} />
        ))}
      </ul>
    </details>
  )
}

export default CoreSettings
