import { useState } from 'react'
import Link from 'next/link'
import orderBy from 'lodash.orderby'
import OptionsIcon from 'shared/components/icons/options.js'
import SettingsIcon from 'shared/components/icons/settings.js'
import MenuIcon from 'shared/components/icons/menu.js'
import { linkClasses, Chevron } from 'shared/components/navigation/primary.js'

// Component that renders a sublevel of navigation
const ModeButtons = props => props.children.length === 0
  ? null
  : (
    <ul className="pl-5 list-inside">
      {props.children.map(mode => (
        <li key={mode.title} className="flex flex-row">
          <button title={mode.title} className={`
            grow pl-2 border-l-2
            ${linkClasses}
            hover:border-secondary
            sm:hover:border-secondary-focus
            text-left
            ${mode.name === props.mode
              ? 'text-secondary border-secondary sm:text-secondary-focus sm:border-secondary-focus'
              : 'text-base-content sm:text-neutral-content'
            }
          `} onClick={mode.onClick}>
            <span className={`
              text-3xl mr-2 inline-block p-0 leading-3
              ${mode.name === props.mode
                ? 'text-secondary sm:text-secondary-focus translate-y-1'
                : 'translate-y-3'
              }
            `}>
              {mode.name === props.mode ? <>&bull;</> : <>&deg;</>}
            </span>
            <span className={mode.name === props.mode ? 'font-bold' : ''}>
              { mode.title }
            </span>
          </button>
        </li>
      ))}
    </ul>
  )

const groupMaker = (t, setMode, pattern) => ({
  modes: {
    icon: <MenuIcon />,
    title: t('app.modes'),
    children: [
      {
        name: 'measurements',
        title: t('app.measurements'),
        onClick: () => setMode('measurements')
      },
      {
        name: 'draft',
        title: t('app.draftThing', { thing: pattern }),
        onClick: () => setMode('draft')
      },
      {
        name: 'test',
        title: t('app.testThing', { thing: pattern }),
        onClick: () => setMode('test')
      },
      {
        name: 'export',
        title: t('app.export'),
        onClick: () => setMode('export')
      },
    ]
  },
  toggles: {
    icon: <OptionsIcon />,
    title: `${t('cfp.turnOn')} / ${t('cfp.turnOff')}`,
  },
  options: {
    icon: <OptionsIcon />,
    title: t('app.designOptions'),
  },
  settings: {
    icon: <SettingsIcon />,
    title: t('app.settings')
  },
})

const WorkbenchMenu = props => {
  const groups = groupMaker(props.app.t, props.setMode, props.pattern)
  return (
    <nav className="smmax-w-96 grow mb-12">
      {Object.keys(groups).map(group => (
        <details className='py-1' key={group}>
          <summary className={`
            flex flex-row uppercase gap-4 font-bold text-lg
            hover:cursor-row-resize
            p-2
            text-base-content
            sm:text-neutral-content
            items-center
          `} open={'modes' === group}>
            <span className="text-secondary-focus mr-4">{groups[group].icon}</span>
            <span className={`grow ${linkClasses}`}>
              {groups[group].title}
            </span>
            <Chevron />
          </summary>
          {group === 'modes' && <ModeButtons {...props} {...groups[group]} />}
        </details>
      ))}
    </nav>
  )
}

export default WorkbenchMenu
