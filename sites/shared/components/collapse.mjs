import { useState } from 'react'
import { CloseIcon, DownIcon } from 'shared/components/icons.mjs'

const OpenTitleButton = ({ title, toggle, color = 'primary', openButtons = [] }) => (
  <button
    className={`flex flex-row items-center justify-between w-full
      bg-${color} text-${color}-content px-4 py-1 text-lg font-medium`}
    onClick={toggle}
  >
    {title}
    <div className="flex flex-row items-center gap-2 z-5">
      {openButtons}
      <button className="btn btn-ghost btn-xs px-0" onClick={toggle}>
        <CloseIcon stroke={3} />
      </button>
    </div>
  </button>
)

export const Collapse = ({
  title,
  openTitle = false,
  children = [],
  buttons = [],
  top = true,
  bottom = false,
  color = 'primary',
  opened = false,
  toggle = false,
  toggleClasses = '',
  toggleIcon = '',
  onClick = false,
  openButtons = null,
}) => {
  const [open, setOpen] = useState(opened)

  const titleBtn = open ? (
    <OpenTitleButton
      title={openTitle || title}
      toggle={() => setOpen(false)}
      {...{ color, openButtons }}
    />
  ) : null

  return open ? (
    <div className={`shadow border-solid border-2 rounded-lg border-${color} my-2`}>
      {top ? titleBtn : null}
      <div className="p-4">{children}</div>
      {bottom ? titleBtn : null}
    </div>
  ) : (
    <div className={`flex flex-row gap-2 my-4 items-center`}>
      <div
        className={`shadow border-solid border-l-[6px] border-r-0 border-t-0 border-b-0 border-${color} min-h-12
            grow flex flex-row gap-4 py-1 px-4 items-center justify-start hover:cursor-pointer hover:bg-${color} hover:bg-opacity-20`}
        onClick={onClick ? onClick : () => setOpen(true)}
      >
        {title}
      </div>
      {toggle ? (
        <button onClick={() => setOpen(true)} className={toggleClasses}>
          {toggle}
        </button>
      ) : (
        buttons
      )}
    </div>
  )
}

export const useCollapseButton = (props) => {
  // Shared state
  const [open, setOpen] = useState(false)

  // Method to allow closing the button
  const close = () => setOpen(false)

  // The component
  const CollapseButton = ({
    title,
    openTitle = false,
    children = [],
    className = 'btn btn-lg btn-primary',
    top = true,
    bottom = false,
    color = 'primary',
  }) => {
    const titleBtn = open ? (
      <OpenTitleButton title={openTitle || title} toggle={() => setOpen(false)} color={color} />
    ) : null

    return open ? (
      <div className={`shadow border-solid border-2 rounded-lg border-${color} mb-2 mt-4`}>
        {top ? titleBtn : null}
        <div className="p-4">{children}</div>
        {bottom ? titleBtn : null}
      </div>
    ) : (
      <button className={className} onClick={() => setOpen(true)}>
        {title}
      </button>
    )
  }

  return { CollapseButton, closeCollapseButton: close }
}
