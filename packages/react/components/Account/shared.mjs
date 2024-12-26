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
  <div className="tw-flex tw-flex-row tw-flex-wrap tw-items-center lg:tw-gap-4 tw-my-2 tw-w-full">
    <div
      className={`${keyWidth} tw-text-left md:tw-text-right tw-block md:tw-inline tw-font-bold tw-pr-4 tw-shrink-0`}
    >
      {title}
    </div>
    <div className="tw-grow">{children}</div>
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
  <Link href={`/welcome/${href}`} className="tw-text-success hover:tw-text-secondary">
    <WelcomeTopicIcon href={href} />
  </Link>
)
export const WelcomeTodoIcon = ({ href }) => (
  <Link
    href={`/welcome/${href}`}
    className="tw-text-secondary tw-w-6 tw-h-6 tw-opacity-50 hover:tw-opacity-100"
  >
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
  <WelcomeTopicIcon href={href} className="tw-w-6 tw-h-6 tw-text-base-content" />
)

export const WelcomeIcons = ({ done = [], todo = [], current = '' }) => (
  <div className="tw-m-auto tw-flex tw-flex-row tw-items-center tw-justify-center tw-gap-2">
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
