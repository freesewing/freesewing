import Link from 'next/link'

const btnClasses = {
  dflt:
    'btn w-full mt-2 btn-secondary ' +
    'flex flex-row flex-nowrap items-center gap-4 py-4 h-auto ' +
    'border border-secondary justify-start text-left bg-opacity-30',
  active:
    'btn-ghost bg-secondary hover:bg-secondary ' + 'hover:bg-opacity-30 hover:border-secondary',
  inactive:
    'hover:bg-opacity-20 hover:bg-secondary btn-ghost ' +
    'border border-secondary hover:border hover:border-secondary',
}

export const ChoiceLink = ({ title = '', href = '', children, icon = null }) => {
  const linkProps = {
    href,
    className: `flex flex-col flex-nowrap items-start justify-start gap-2 pt-2 pb-4 h-auto w-full mt-3
      btn btn-secondary btn-ghost border border-secondary
      hover:bg-opacity-20 hover:bg-secondary hover:border hover:border-secondary`,
  }

  const content = (
    <>
      <h5 className="flex flex-row items-center justify-between w-full">
        <span>{title}</span>
        {icon}
      </h5>
      <div className={`normal-case text-base font-medium text-base-content text-left`}>
        {children}
      </div>
    </>
  )

  // Deal with external links
  return href.slice(0, 4).toLowerCase() === 'http' ? (
    <a {...linkProps}>{content}</a>
  ) : (
    <Link {...linkProps}>{content}</Link>
  )
}
