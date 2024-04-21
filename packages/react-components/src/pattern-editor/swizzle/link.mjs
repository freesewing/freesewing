import Link from 'next/link'

const linkClasses =
  'underline decoration-2 hover:decoration-4 text-secondary hover:text-secondary-focus'

const AnchorLink = ({ id, txt = false, children }) => (
  <a href={`#${id}`} className={linkClasses} title={txt ? txt : ''}>
    {txt ? txt : children}
  </a>
)

const PageLink = ({ href, txt = false, children }) => (
  <Link href={href} className={linkClasses} title={txt ? txt : ''}>
    {children ? children : txt}
  </Link>
)

const WebLink = ({ href, txt = false, children }) => (
  <a href={href} className={linkClasses} title={txt ? txt : ''}>
    {children ? children : txt}
  </a>
)

const CardLink = ({
  bg = 'bg-base-200',
  textColor = 'text-base-content',
  href,
  title,
  text,
  icon,
}) => (
  <Link
    href={href}
    className={`px-8 ${bg} py-10 rounded-lg block ${textColor}
    hover:bg-secondary hover:bg-opacity-10 shadow-lg
    transition-color duration-300 grow`}
  >
    <h2 className="mb-4 text-inherit flex flex-row gap-4 justify-between items-center font-medium">
      {title}
      <span className="shrink-0">{icon}</span>
    </h2>
    <p className="font-medium text-inherit italic text-lg">{text}</p>
  </Link>
)

export { linkClasses, Link, AnchorLink, PageLink, WebLink, CardLink }
