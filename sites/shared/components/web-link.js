const WebLink = ({ href, txt }) => (
  <a
    href={href}
    className={`
    font-medium text-secondary
    hover:text-secondary-focus hover:underline`}
    title={txt}
  >
    {txt}
  </a>
)

export default WebLink
