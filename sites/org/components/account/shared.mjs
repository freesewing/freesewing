import { Spinner } from 'shared/components/spinner.mjs'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import {
  CogIcon,
  ControlIcon,
  NewsletterIcon,
  UnitsIcon,
  CompareIcon,
  LabelIcon,
  BioIcon,
  UserIcon,
  LeftIcon,
  OkIcon,
  NoIcon,
} from 'shared/components/icons.mjs'

const btnClasses = {
  dflt:
    'btn w-full mt-2 btn-secondary ' +
    'flex flex-row flex-nowrap items-center gap-4 py-4 h-auto ' +
    'border border-secondary justify-start text-left bg-opacity-30',
  active:
    'btn-ghost bg-secondary hover:bg-secondary ' + 'hover:bg-opacity-30 hover:border-secondary',
  inactive:
    'hover:bg-opacity-20 hover:bg-secondary btn-ghost ' +
    'border border-secondary hover:border hover:border-secondary',
}
const spanClasses =
  'p-2 w-8 h-8 shrink-0 rounded-full text-center p-0 py-2 bg-secondary text-secondary-content'

export const BackToAccountButton = ({ loading = false }) => {
  const { t } = useTranslation(['account'])

  return (
    <Link className={`btn ${loading ? 'btn-accent' : 'btn-secondary'} mt-4 pr-6`} href="/account">
      <span className="flex flex-row items-center gap-2">
        {loading ? <Spinner /> : <LeftIcon />}
        {t('yourAccount')}
      </span>
    </Link>
  )
}

export const Choice = ({
  val,
  update,
  current,
  children,
  bool = false,
  boolChoices = {
    yes: <OkIcon className="w-6 h-6 text-success shrink-0" stroke={4} />,
    no: <NoIcon className="w-6 h-6 text-error shrink-0" stroke={3} />,
  },
}) => {
  const active = val === current

  return (
    <button
      className={`${btnClasses.dflt} ${active ? btnClasses.active : btnClasses.inactive}`}
      onClick={() => update(val)}
    >
      {bool ? boolChoices[val] : <span className={spanClasses}>{val}</span>}
      <div className={`normal-case text-base-content`}>{children}</div>
    </button>
  )
}

export const DoneIcon = ({ href }) => (
  <Link href={`/welcome/${href}`} className="text-success hover:text-secondary">
    <TopicIcon href={href} />
  </Link>
)
export const TodoIcon = ({ href }) => (
  <Link href={`/welcome/${href}`} className="text-secondary w-6 h-6 opacity-50 hover:opacity-100">
    <TopicIcon href={href} />
  </Link>
)

const TopicIcon = (props) => {
  const Icon =
    props.href === '' || props.href === 'control'
      ? ControlIcon
      : icons[props.href]
      ? icons[props.href]
      : CogIcon

  return <Icon {...props} />
}

const DoingIcon = ({ href }) => <TopicIcon href={href} className="w-6 h-6 text-base-content" />

export const Icons = ({ done = [], todo = [], current = '' }) => (
  <div className="m-auto flex flex-row items-center justify-center gap-2">
    {done.map((href) => (
      <DoneIcon href={href} key={href} />
    ))}
    <DoingIcon href={current} />
    {todo.map((href) => (
      <TodoIcon href={href} key={href} />
    ))}
  </div>
)

const icons = {
  newsletter: NewsletterIcon,
  units: UnitsIcon,
  compare: CompareIcon,
  username: LabelIcon,
  bio: BioIcon,
  img: UserIcon,
}

export const welcomeSteps = {
  1: [''],
  2: ['', 'newsletter', 'units'],
  3: ['', 'newsletter', 'units', 'compare', 'username'],
  4: ['', 'newsletter', 'units', 'compare', 'username', 'bio', 'img'],
  5: [''],
}
