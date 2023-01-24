import OkIcon from 'shared/components/icons/ok.js'
import NoIcon from 'shared/components/icons/no.js'
import CogIcon from 'shared/components/icons/cog.js'

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
  'p-4 w-8 h-8 shrink-0 rounded-full text-center p-0 py-2 bg-secondary text-secondary-content'

export const Choice = ({ val, update, t, current, children, bool = false }) => {
  const active = val === current

  return (
    <button
      className={`${btnClasses.dflt} ${active ? btnClasses.active : btnClasses.inactive}`}
      onClick={() => update(val)}
    >
      <span className={spanClasses}>{bool ? (val === 'yes' ? 1 : 2) : val}</span>
      <div className={`normal-case text-base-content`}>{children}</div>
    </button>
  )
}

export const DoneIcon = ({ href }) => (
  <div className="bg-warning">
    <Link href={href} className="bg-warning">
      <OkIcon />
    </Link>
  </div>
)

const TodoIcon = () => <CogIcon className="w-6 h-6 text-primary opacity-50" />
const DoingIcon = () => <CogIcon className="w-6 h-6 text-secondary" />

export const Icons = ({ done = [], todo = [] }) => (
  <div className="m-auto flex flex-row items-center justify-center gap-2">
    {done.map((href) => (
      <DoneIcon href={href} key={href} />
    ))}
    <DoingIcon />
    {todo.map((href) => (
      <TodoIcon href={href} key={href} />
    ))}
  </div>
)

export const welcomeSteps = {
  1: [],
  2: ['newsletter', 'units'],
  3: ['newsletter', 'units', 'compare', 'username'],
  3: ['newsletter', 'units', 'compare', 'username', 'bio', 'pic'],
  5: [],
}
