import MenuIcon from 'shared/components/icons/menu.js'
import { linkClasses, Chevron } from 'shared/components/navigation/primary.js'
import { useTranslation } from 'next-i18next'

const View = props => {
  const { t } = useTranslation(['app'])
  const entries = [
    {
      name: 'measurements',
      title: t('measurements'),
      onClick: () => props.updateGist(['_state', 'view'], 'measurements')
    },
    {
      name: 'draft',
      title: t('draftPattern', { pattern: props.pattern.config.name }),
      onClick: () => props.updateGist(['_state', 'view'], 'draft')
    },
    {
      name: 'test',
      title: t('testPattern', { pattern: props.pattern.config.name }),
      onClick: () => props.updateGist(['_state', 'view'], 'test')
    },
    {
      name: 'export',
      title: t('export'),
      onClick: () => props.updateGist(['_state', 'view'], 'export')
    },
    {
      name: 'events',
      title: t('events'),
      onClick: () => props.updateGist(['_state', 'view'], 'events')
    },
    {
      name: 'yaml',
      title: t('YAML'),
      onClick: () => props.updateGist(['_state', 'view'], 'yaml')
    },
    {
      name: 'json',
      title: t('JSON'),
      onClick: () => props.updateGist(['_state', 'view'], 'json')
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
          {t('view')}
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
              ${entry.name === props.gist?._state?.view
                ? 'text-secondary border-secondary sm:text-secondary-focus sm:border-secondary-focus'
                : 'text-base-content sm:text-neutral-content'
              }
            `} onClick={entry.onClick}>
              <span className={`
                text-3xl mr-2 inline-block p-0 leading-3
                ${entry.name === props.gist?._state?.view
                  ? 'text-secondary sm:text-secondary-focus translate-y-1 font-bold'
                  : 'translate-y-3'
                }
              `}>
                {entry.name === props.gist?._state?.view ? <>&bull;</> : <>&deg;</>}
              </span>
              <span className={entry.name === props.gist?._state?.view ? 'font-bold' : ''}>
                { entry.title }
              </span>
            </button>
          </li>
        ))}
      </ul>
    </details>
  )
}

export default View
