const sizes = { lg: 96, md: 52, sm: 36 }

export const MeasurementsSetCard = ({
  set,
  onClick = false,
  href = false,
  useA = false,
  Design = false,
  language = false,
  size = 'lg',
  Swizzled,
  config,
}) => {
  const s = sizes[size]
  const { t, hasRequiredMeasurements } = Swizzled.methods
  const { NoIcon, OkIcon } = Swizzled.components

  const wrapperProps = {
    className: `bg-base-300 aspect-square h-${s} w-${s} mb-2
      mx-auto flex flex-col items-start text-center justify-between rounded-none md:rounded shadow`,
    style: {
      backgroundImage: `url(${Swizzled.methods.cloudImageUrl({ type: 'w500', id: set.img })})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: '50%',
    },
  }
  if (!set.img || set.img === 'default-avatar')
    wrapperProps.style.backgroundPosition = 'bottom right'

  let icon = <span></span>
  let missingMeasies = ''
  let linebreak = ''
  const maxLength = 75
  if (Design) {
    const [hasMeasies, missing] = hasRequiredMeasurements(Design, set.measies)
    const iconClasses = 'w-8 h-8 p-1 rounded-full -mt-2 -ml-2 shadow'
    icon = hasMeasies ? (
      <OkIcon className={`${iconClasses} bg-success text-success-content`} stroke={4} />
    ) : (
      <NoIcon className={`${iconClasses} bg-error text-error-content`} stroke={3} />
    )
    if (missing.length > 0) {
      const translated = missing.map((m) => {
        return t(m)
      })
      let missingString = translated.join(', ')
      if (missingString.length > maxLength) {
        const lastSpace = missingString.lastIndexOf(', ', maxLength)
        missingString = missingString.substring(0, lastSpace) + ', ' + '...'
      }
      const measieClasses = 'font-normal text-xs'
      missingMeasies = <span className={`${measieClasses}`}>{missingString}</span>
      linebreak = <br />
    }
  }

  const inner = (
    <>
      {icon}
      <span className="bg-neutral text-neutral-content px-4 w-full bg-opacity-50 py-2 rounded rounded-t-none font-bold leading-5">
        {language ? set[`name${capitalize(language)}`] : set.name}
        {linebreak}
        {missingMeasies}
      </span>
    </>
  )

  // Is it a button with an onClick handler?
  if (onClick)
    return (
      <button {...wrapperProps} onClick={() => onClick(set)}>
        {inner}
      </button>
    )

  // Returns a link to an internal page
  if (href && !useA)
    return (
      <Link {...wrapperProps} href={href}>
        {inner}
      </Link>
    )

  // Returns a link to an external page
  if (href && useA)
    return (
      <a {...wrapperProps} href={href}>
        {inner}
      </a>
    )

  // Returns a div
  return <div {...wrapperProps}>{inner}</div>
}
