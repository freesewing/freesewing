export const Ux = ({ Swizzled, ux = 0 }) => (
  <div className="flex flex-row">
    {[0, 1, 2, 3, 4].map((i) => (
      <Swizzled.components.CircleIcon
        key={i}
        fill={i < ux ? true : false}
        className={`w-6 h-6 ${i < ux ? 'stroke-secondary fill-secondary' : 'stroke-current'}`}
        fillOpacity={0.3}
      />
    ))}
  </div>
)
