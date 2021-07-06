import Icon from "./icon"

const classNames = {
  fixme: {
    main: 'border-warning',
    label: 'bg-warning text-base-100',
  },
  note: {
    main: 'border-base-300',
    label: 'bg-base-300 text-base-content',
  },
  tip: {
    main: 'border-primary',
    label: 'bg-primary text-base-100',
  },
  warning: {
    main: 'border-error',
    label: 'bg-error text-base-100',
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
    <div className="relative pt-4">
      {(type !== 'none') && (
        <div className={`absolute left-4 -top-1 block px-4 py-1 text-sm uppercase font-bold rounded-t-lg ${classNames[type].label}`}>
          <Icon icon={type} size="16" className="inline-block mr-2"/>
          {type}
          <Icon icon={type} size="16" className="inline-block ml-2"/>
        </div>
      )}
      <div className={`border-2 px-4 rounded-lg static my-2 prose bg-main-100 lg:prose-lg ${type} ${classNames[type].main}`}>
        <div className="py-4 first:mt-0 popout-content">{props.children}</div>
      </div>
    </div>
  )
}

export default Popout
