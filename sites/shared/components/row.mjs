export const Row = ({ children, valid = true, buttons = [] }) => (
  <div
    className={`
    ${valid ? 'border-primary bg-primary' : 'border-warning bg-warning'}
    shadow my-2 border-solid border-l-[6px]
    border-r-0 border-t-0 border-b-0 bg-opacity-0
    hover:bg-opacity-10
    `}
  >
    <div className="px-4 py-1 flex flex-row gap-2 items-center justify-between hover:cursor-pointer">
      {children}
    </div>
  </div>
)
