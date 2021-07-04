import icons from './icons'

const Icon = ({
  size = 24,
  icon = 'github',
  color = false,
  className = '',
}) => {

  const svgProps = {
    xmlns: 'http://www.w3.org/2000/svg',
    viewBox: '0 0 24 24',
    className: className,
  }

  if (size) {
    svgProps.width = size
    svgProps.height = size
  }

  return (
    <svg {...svgProps}>
      <path stroke="none" fill={color ? color : 'currentColor'} d={icons[icon]} />
    </svg>
  )
}

export default Icon
