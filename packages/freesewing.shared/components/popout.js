import Icon from "shared/components/icon"

const colors = {
  note: 'accent',
  tip: 'secondary',
  warning: 'error',
  fixme: 'warning',
  link: 'info',
  related: 'info',
  none: '',
}

let forceTailwind = <p className="border-accent" />
forceTailwind = <p className="text-accent" />
forceTailwind = <p className="border-secondary" />
forceTailwind = <p className="text-secondary" />
forceTailwind = <p className="border-error" />
forceTailwind = <p className="text-error" />
forceTailwind = <p className="border-warning" />
forceTailwind = <p className="text-warning" />
forceTailwind = <p className="border-info" />
forceTailwind = <p className="text-info" />

const Popout = (props) => {
  let type = 'none'
  for (const t in colors) {
    if (props[t]) type = t
  }
  const color = colors[type]

  return (
    <div className="relative my-4">
      <div className={`
        border-l-4 px-8 py-2 shadow border-${color}`}>
        <div className={`font-bold uppercase text-${color}`}>
          {type}
        </div>
        <div className="py-1 first:mt-0 popout-content">{props.children}</div>
      </div>
    </div>
  )
}

export default Popout
