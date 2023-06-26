export const ChoiceButton = ({
  title = '',
  onClick,
  children,
  icon = null,
  color = 'secondary',
  active = false,
}) => (
  <button
    onClick={onClick}
    className={`
    flex flex-col flex-nowrap items-start justify-start gap-2 pt-2 pb-4 h-auto w-full mt-3
    btn btn-${color} btn-ghost border border-${color}
    hover:bg-opacity-20 hover:bg-${color} hover:border hover:border-${color}
    ${active ? 'bg-' + color + ' bg-opacity-20 border border-' + color : ''}
  `}
  >
    <h5 className="flex flex-row items-center justify-between w-full">
      <span>{title}</span>
      {icon}
    </h5>
    <div className={`normal-case text-base font-medium text-base-content text-left`}>
      {children}
    </div>
  </button>
)
