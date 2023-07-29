export const ChoiceButton = ({
  title = '',
  onClick,
  children,
  icon = null,
  color = 'secondary',
  active = false,
  noMargin = false,
}) => (
  <button
    onClick={onClick}
    className={`
    flex flex-col flex-nowrap items-start justify-start gap-2 pt-2 pb-4 h-auto w-full ${
      noMargin ? '' : 'mt-3'
    }
    btn btn-${color} 
    
    ${active ? 'btn-' + color : ' btn-outline'}
  `}
  >
    <h5 className="flex flex-row items-center justify-between w-full text-inherit">
      <span>{title}</span>
      {icon}
    </h5>
    <div className={`normal-case font-medium text-left `}>{children}</div>
  </button>
)
