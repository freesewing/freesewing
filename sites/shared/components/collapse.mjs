import { useState } from 'react'
import { DownIcon } from 'shared/components/icons.mjs'

export const Collapse = ({ title, children, valid = true, buttons = [], opened = false }) => {
  const [open, setOpen] = useState(opened)

  return (
    <div
      className={`
      ${valid ? 'border-primary' : 'border-warning'}
      shadow my-4 border-solid border-l-[6px]
      border-r-0 border-t-0 border-b-0`}
    >
      <div
        className={`
          ${valid ? `bg-primary bg-opacity-0` : `bg-warning bg-opacity-20`} ${
          open ? 'bg-opacity-100 min-h-0 text-primary-content' : ''
        }
        p-0 min-h-0 `}
        onClick={() => setOpen(!open)}
      >
        <div className="px-4 py-1 flex flex-row items-center justify-between hover:cursor-pointer">
          <div>
            <b>{title[0]}</b> <span className="font-normal font-lg">{title[1]}</span>
          </div>
          <div className="flex flex-row gap-2 items-center">
            {buttons}
            <DownIcon
              stroke={3}
              className={`w-6 h-6 transition-transform ${
                open ? 'text-primary-content rotate-180' : 'text-base-content'
              }`}
            />
          </div>
        </div>
        {open ? (
          <div className="bg-base-100 text-base-content px-4 py-2">
            <div className="pt-4">{children}</div>
          </div>
        ) : null}
      </div>
    </div>
  )
}
