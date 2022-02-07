import MenuIcon from 'shared/components/icons/menu.js'
import OptionsIcon from 'shared/components/icons/options.js'
import { linkClasses, Chevron } from 'shared/components/navigation/primary.js'
import { useTranslation } from 'next-i18next'

const Modes = props => {
  const { t } = useTranslation(['app'])
  const entries = [
    {
      name: 'measurements',
      title: t('measurements'),
      onClick: () => props.setMode('measurements')
    },
    {
      name: 'draft',
      title: t('draftPattern', { pattern: props.pattern.config.name }),
      onClick: () => props.setMode('draft')
    },
    {
      name: 'test',
      title: t('testPattern', { pattern: props.pattern.config.name }),
      onClick: () => props.setMode('test')
    },
    {
      name: 'export',
      title: t('export'),
      onClick: () => props.setMode('export')
    },
  ]

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
        <span className="text-secondary-focus mr-4"><MenuIcon /></span>
        <span className={`grow ${linkClasses} hover:cursor-resize`}>
          {t('modes')}
        </span>
        <Chevron />
      </summary>
      <ul className="pl-5 list-inside">
        {entries.map(entry => (
          <li key={entry.title} className="flex flex-row">
            <button title={entry.title} className={`
              grow pl-2 border-l-2
              ${linkClasses}
              hover:cursor-pointer
              hover:border-secondary
              sm:hover:border-secondary-focus
              text-left
              capitalize
              ${entry.name === props.mode
                ? 'text-secondary border-secondary sm:text-secondary-focus sm:border-secondary-focus'
                : 'text-base-content sm:text-neutral-content'
              }
            `} onClick={entry.onClick}>
              <span className={`
                text-3xl mr-2 inline-block p-0 leading-3
                ${entry.name === props.mode
                  ? 'text-secondary sm:text-secondary-focus translate-y-1'
                  : 'translate-y-3'
                }
              `}>
                {entry.name === props.mode ? <>&bull;</> : <>&deg;</>}
              </span>
              <span className={entry.name === props.mode ? 'font-bold' : ''}>
                { entry.title }
              </span>
            </button>
          </li>
        ))}
      </ul>
    </details>
  )
}

export default Modes
