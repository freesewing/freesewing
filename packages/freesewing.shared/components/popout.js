import Icon from "shared/components/icon"

const colors = {
  note: 'secondary',
  tip: 'warning',
  warning: 'error',
  fixme: 'accent',
  none: '',
}

const Popout = (props) => {
  let type = 'none'
  for (const t in colors) {
    if (props[t]) type = t
  }
  const color = colors[type]

  return (
    <div className="relative my-2">
      <div className={`
        border-l-4 px-4 py-2 prose lg:prose-lg bg-opacity-5 shadow border-${color} bg-${color}`}>
        <div className={`font-bold opacity-50`}>{type.toUpperCase()}</div>
        <div className="py-1 first:mt-0 popout-content">{props.children}</div>
      </div>
    </div>
  )
}

export default Popout
