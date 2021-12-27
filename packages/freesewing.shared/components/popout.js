import Icon from "shared/components/icon"

const colors = {
  note: 'primary',
  tip: 'accent',
  warning: 'error',
  fixme: 'warning',
  link: 'secondary',
  related: 'info',
  none: '',
}

let forceTailwind = <p className="border-accent bg-accent" />
forceTailwind = <p className="text-accent" />
forceTailwind = <p className="border-secondary bg-secondary" />
forceTailwind = <p className="text-secondary" />
forceTailwind = <p className="border-error bg-error" />
forceTailwind = <p className="text-error" />
forceTailwind = <p className="border-warning bg-warning" />
forceTailwind = <p className="text-warning" />
forceTailwind = <p className="border-info bg-info" />
forceTailwind = <p className="text-info" />
forceTailwind = <p className="border-success bg-success" />
forceTailwind = <p className="text-success" />
forceTailwind = <p className="border-primary bg-primary" />
forceTailwind = <p className="text-primary" />

const Popout = (props) => {
  let type = 'none'
  for (const t in colors) {
    if (props[t]) type = t
  }
  const color = colors[type]

  return (
    <div className={`relative my-8 bg-${color} bg-opacity-5`}>
      <div className={`
        border-y-4 sm:border-0 sm:border-l-4 px-6 sm:px-8 py-4 sm:py-2 shadow border-${color}`}>
        <div className={`font-bold uppercase text-${color}`}>
          {type}
        </div>
        <div className="py-1 first:mt-0 popout-content">{props.children}</div>
      </div>
    </div>
  )
}

export default Popout
