const classNames = {
  primary: "btn btn-primary",
  secondary: "btn btn-primary bg-transparent border-primary border-2 text-primary hover:bg-primary-focus hover:text-primary-content",
  accent: "btn btn-primary bg-accent border-2 border-accent",
  success: "btn btn-primary",
  warning: "btn btn-warning",
  danger: "btn btn-error",
  link: "btn btn-link",
  ghost: "btn btn-ghost",
}

const Button = props => {
  const { extraClasses='' } = props
  let type = 'ghost'
  for (const t in classNames) {
    if (props[t]) type = t
  }

  return (
    <button
      className={`
        ${classNames[type]}
        ${extraClasses}
        ${props.block ? ' btn-block' : ''}
      `}
      {...props}
    >
      {props.children}
    </button>
  )
}

export default Button

