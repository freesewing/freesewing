export const Control = ({ Swizzled, control = 0 }) => (
  <div className="flex flex-row">
    {[0, 1, 2, 3, 4].map((i) => (
      <Swizzled.components.CircleIcon key={i} fill={i < control ? false : true} />
    ))}
  </div>
)
