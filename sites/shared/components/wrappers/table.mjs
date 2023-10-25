/*
 * Tables on mobile will almost always break the layout
 * unless we set the overflow behaviour explicitly
 */
export const TableWrapper = ({ children }) => (
  <div className="max-w-full overflow-x-auto">{children}</div>
)
