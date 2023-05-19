export const Bullet = ({ num, children }) => (
  <div className="flex flex-row items-center py-4 w-full gap-4">
    <span className="bg-secondary text-secondary-content rounded-full w-8 h-8 p-1 inline-block text-center font-bold mr-4 shrink-0">
      {num}
    </span>
    <div className="text-lg grow">{children}</div>
  </div>
)
