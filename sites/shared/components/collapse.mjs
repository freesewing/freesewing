import { DownIcon } from 'shared/components/icons.mjs'

export const Collapse = ({ title, children, valid = true, buttons = [] }) => (
  <div
    className={`collapse
    ${valid ? 'border-primary' : 'border-warning'}
    shadow my-4 border-solid border-l-[6px]
    border-r-0 border-t-0 border-b-0`}
  >
    <input type="checkbox" className="peer min-h-0" />
    <div
      className={`collapse-title ${
        valid
          ? 'bg-primary bg-opacity-0 peer-checked:bg-primary'
          : 'bg-warning bg-opacity-20 peer-checked:bg-warning'
      }
      peer-checked:bg-opacity-100 px-4 py-2 min-h-0 peer-checked:min-h-0
      peer-checked:text-primary-content`}
    >
      <div className="flex flex-row items-center justify-between">
        <div>
          <b>{title[0]}</b> <span className="font-normal font-lg">{title[1]}</span>
        </div>
        <div className="flex flex-row gap-2 items-center">
          {buttons}
          <DownIcon stroke={3} />
        </div>
      </div>
    </div>
    <div className="collapse-content">
      <div className="pt-4">{children}</div>
    </div>
  </div>
)
