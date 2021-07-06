import Icon from "./icon"

const classNames = {
  fixme: {
    main: 'border-warning',
    label: 'bg-warning text-sm text-neutral py-2',
  },
  note: {
    main: 'border-base-content',
    label: 'bg-base-content',
  },
  tip: {
    main: 'border-info',
    label: 'bg-info',
  },
  warning: {
    main: 'border-error',
    label: 'bg-error',
  },
  none: {
    main: '',
    label: '',
  }
}

const Popout = (props) => {
  let type = 'none'
  for (const t in classNames) {
    if (props[t]) type = t
  }

  return (
    <div className={`border-2 px-4 rounded-t-lg border-b-8 static my-2 mb-10 prose ${type} ${classNames[type].main}`}>
      <div className="py-2 first:mt-0 popout-content">{props.children}</div>
      <div className={`absolute block px-4 py-1 uppercase font-bold text-neutral-content rounded-b-lg ${classNames[type].label}`}>
        {type === 'fixme' ? 'fixme' : <Icon icon={type} size="24" />}
      </div>
    </div>
  )
}

export default Popout
