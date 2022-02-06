import poses from './poses'

// pose is one of:
//  fail,
//  ohno,
//  shrug,
//  shrug2,
//  yay

const Robot = ({
  size = 124,
  viewBox = '0 0 500 500',
  className = '',
  pose = 'yay',
  color = false,
  embed = false
}) => (
  <svg
    className={className || ''}
    xmlns="http://www.w3.org/2000/svg"
    width={embed ? '' : size || 124}
    height={embed ? '' : size || 124}
    viewBox={viewBox || '0 0 500 500'}
  >
    <path stroke="none" fill={color ? color : 'currentColor'} d={poses[pose]} />
  </svg>
)

export default Robot
