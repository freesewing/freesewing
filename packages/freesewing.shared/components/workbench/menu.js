import { useState } from 'react'
import Link from 'next/link'
import orderBy from 'lodash.orderby'
import OptionsIcon from 'shared/components/icons/options.js'
import SettingsIcon from 'shared/components/icons/settings.js'
import { linkClasses, Chevron } from 'shared/components/navigation/primary.js'

const structure = (pattern, app) => ({
  modes: [
    { title: `Draft ${pattern.config.name}`, action: '' },
  ],
  options: [
    { title: `Draft ${pattern.config.name}`, action: '' },
  ],
  settings: [
    { title: `Draft ${pattern.config.name}`, action: '' },
  ],
})

const TopLevel = ({ icon, title }) => (
  <details className='py-1'>
    <summary className={`
      flex flex-row uppercase gap-4 font-bold text-lg
      hover:cursor-row-resize
      p-2
      text-base-content
      sm:text-neutral-content
      items-center
    `}>
      <span className="text-secondary-focus mr-4">{icon}</span>
      <span className={`grow ${linkClasses}`}>
        {title}
      </span>
      <Chevron />
    </summary>
    fixme
  </details>
)

const Menu = ({ app, pattern }) => ([
  <TopLevel key='a' title='Toggles' icon={<OptionsIcon />} pattern={pattern} />,
  <TopLevel key='b' title='Modes' icon={<OptionsIcon />} pattern={pattern} />,
  <TopLevel key='c' title='Design Options' icon={<OptionsIcon />} pattern={pattern} />,
  <TopLevel key='d' title='Pattern Settings' icon={<SettingsIcon />} pattern={pattern} />,
])

const WorkbenchMenu = ({ app, pattern }) => (
  <nav className="smmax-w-96 grow mb-12">
    <Menu app={app} pattern={pattern} />
  </nav>
)

export default WorkbenchMenu
