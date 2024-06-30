export const Control = ({ Swizzled, control = 0 }) => (
  <div className="flex flex-row">
    {[0, 1, 2, 3, 4].map((i) => (
      <Swizzled.components.CircleIcon
        key={i}
        fill={i < control ? true : false}
        className={`w-6 h-6 ${i < control ? 'stroke-secondary fill-secondary' : 'stroke-current'}`}
        fillOpacity={0.3}
      />
    ))}
  </div>
)
