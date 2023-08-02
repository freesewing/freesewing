export const ns = ['']

export const LabLayout = ({ children = [] }) => (
  <div className="pb-24 flex flex-row">
    <div className="w-full xl:w-3/4 px-8">{children}</div>
  </div>
)
