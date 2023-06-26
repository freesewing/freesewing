import { useState } from 'react'
import { DownIcon } from 'shared/components/icons.mjs'
import Link from 'next/link'

const OpenTitleButton = ({
  title,
  toggle,
  color = 'primary',
  openButtons = [],
  bottom = false,
}) => (
  <div
    role="button"
    className={`flex flex-row items-center justify-between w-full ${
      bottom ? 'lg:rounded-b-lg' : 'lg:rounded-t-lg'
    }
      bg-${color} text-${color}-content px-4 py-1 text-lg font-medium`}
    onClick={toggle}
  >
    {<DownIcon className="rotate-180 w-6 h-6 mr-4" />}
    {!bottom && title}
    <div className="flex flex-row items-center gap-2 z-5">
      {openButtons}
      <button className="btn btn-ghost btn-xs px-0" onClick={toggle}></button>
    </div>
  </div>
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
  onClick = false,
  openButtons = null,
  className = '',
}) => {
  const [open, setOpen] = useState(opened)

  const TitleBtn = ({ bottom }) =>
    open ? (
      <OpenTitleButton
        title={openTitle || title}
        toggle={() => setOpen(false)}
        {...{ color, openButtons, bottom }}
      />
    ) : null

  return open ? (
    <div
      className={`shadow border-solid border border-l-0 border-r-0 border-b-2 lg:border-l lg:border-r lg:border-b lg:rounded-lg border-${color} my-4 -mx-4 lg:mx-0`}
    >
      {top ? <TitleBtn /> : null}
      <div className="p-2 lg:p-4">{children}</div>
      {bottom ? <TitleBtn bottom /> : null}
    </div>
  ) : (
    <div className={`flex flex-row gap-2 my-4 items-center ${className}`}>
      <div
        className={`shadow border-solid border-l-[6px] border-r-0 border-t-0 border-b-0 border-${color} min-h-12
            grow flex flex-row gap-4 py-1 px-4 items-center justify-start hover:cursor-pointer hover:bg-${color} hover:bg-opacity-20`}
        onClick={onClick ? onClick : () => setOpen(true)}
      >
        <DownIcon /> {title}
        {toggle ? (
          <button onClick={() => setOpen(true)} className={toggleClasses}>
            {toggle}
          </button>
        ) : (
          buttons
        )}
      </div>
    </div>
  )
}

export const MimicCollapseLink = ({
  title,
  buttons = [],
  color = 'primary',
  href = '/',
  className = '',
}) => (
  <Link className={`flex flex-row gap-2 my-4 items-center ${className}`} href={href}>
    <div
      className={`shadow border-solid border-l-[6px] border-r-0 border-t-0 border-b-0 border-${color} min-h-12
          grow flex flex-row gap-4 py-1 px-4 items-center justify-start hover:cursor-pointer hover:bg-${color} hover:bg-opacity-20`}
    >
      {title}
    </div>
    {buttons}
  </Link>
)

export const useCollapseButton = () => {
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
      <div className={`shadow border-solid border rounded-lg border-${color} mb-2 mt-4`}>
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
