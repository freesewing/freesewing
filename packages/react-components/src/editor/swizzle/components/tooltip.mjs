export const Tooltip = (props) => {
  const { children, tip, ...rest } = props

  return (
    <div
      {...rest}
      className={`tooltip tooltip-bottom before:bg-base-200 before:shadow before:text-base-content`}
      data-tip={tip}
    >
      {children}
    </div>
  )
}
