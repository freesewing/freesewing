import Link from 'next/link'

const AnchorLink = ({ id, txt = false, children, Swizzled }) => (
  <a href={`#${id}`} className={Swizzled.config.classes.link} title={txt ? txt : ''}>
    {txt ? txt : children}
  </a>
)

const PageLink = ({ href, txt = false, children, Swizzled }) => (
  <Swizzled.components.Link
    href={href}
    className={Swizzled.config.classes.link}
    title={txt ? txt : ''}
  >
    {children ? children : txt}
  </Swizzled.components.Link>
)

const WebLink = ({ href, txt = false, children, Swizzled }) => (
  <a href={href} className={Swizzled.config.classes.link} title={txt ? txt : ''}>
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
  Swizzled,
}) => (
  <Swizzled.components.Link
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
  </Swizzled.components.Link>
)

export { Link, AnchorLink, PageLink, WebLink, CardLink }
