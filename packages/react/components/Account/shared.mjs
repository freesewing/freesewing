import React from 'react'
import { Link } from '@freesewing/react/components/Link'
import {
  SettingsIcon,
  ControlIcon,
  NewsletterIcon,
  UnitsIcon,
  CompareIcon,
  DocsIcon,
  UserIcon,
  LeftIcon,
  OkIcon,
  NoIcon,
  ShowcaseIcon,
} from '@freesewing/react/components/Icon'

/*
 * A component to display a row of data
 */
export const DisplayRow = ({ title, children, keyWidth = 'w-24' }) => (
  <div className="flex flex-row flex-wrap items-center lg:gap-4 my-2 w-full">
    <div className={`${keyWidth} text-left md:text-right block md:inline font-bold pr-4 shrink-0`}>
      {title}
    </div>
    <div className="grow">{children}</div>
  </div>
)

export const welcomeSteps = {
  1: [''],
  2: ['', 'newsletter', 'units'],
  3: ['', 'newsletter', 'units', 'compare', 'username'],
  4: ['', 'newsletter', 'units', 'compare', 'username', 'bio', 'img'],
  5: [''],
}

export const WelcomeDoneIcon = ({ href }) => (
  <Link href={`/welcome/${href}`} className="text-success hover:text-secondary">
    <WelcomeTopicIcon href={href} />
  </Link>
)
export const WelcomeTodoIcon = ({ href }) => (
  <Link href={`/welcome/${href}`} className="text-secondary w-6 h-6 opacity-50 hover:opacity-100">
    <WelcomeTopicIcon href={href} />
  </Link>
)

const WelcomeTopicIcon = (props) => {
  const Icon =
    props.href === '' || props.href === 'control'
      ? ControlIcon
      : icons[props.href]
        ? icons[props.href]
        : SettingsIcon

  return <Icon {...props} />
}

const WelcomeDoingIcon = ({ href }) => (
  <WelcomeTopicIcon href={href} className="w-6 h-6 text-base-content" />
)

export const WelcomeIcons = ({ done = [], todo = [], current = '' }) => (
  <div className="m-auto flex flex-row items-center justify-center gap-2">
    {done.map((href) => (
      <WelcomeDoneIcon href={href} key={href} />
    ))}
    <WelcomeDoingIcon href={current} />
    {todo.map((href) => (
      <WelcomeTodoIcon href={href} key={href} />
    ))}
  </div>
)

const icons = {
  newsletter: NewsletterIcon,
  units: UnitsIcon,
  compare: CompareIcon,
  username: UserIcon,
  bio: DocsIcon,
  img: ShowcaseIcon,
}
