export const WebLink = ({ href, txt }) => (
  <a href={href} className="underline decoration-2 hover:decoration-4" title={txt}>
    {txt}
  </a>
)
