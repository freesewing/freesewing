export const Spoiler = ({ children = null }) => {
  return (
    <label role="presentation" className="spoiler-wrapper">
      <input type="checkbox" aria-hidden="true" />
      <div className="spoiler-blur">{children}</div>
    </label>
  )
}
