import { fail, ohno, shrug, shrug2, yay } from './poses.mjs'

const poses = {
  fail,
  ohno,
  shrug,
  shrug2,
  yay,
}

export const Robot = ({
  size = 124,
  viewBox = '0 0 500 500',
  className = '',
  pose = 'yay',
  color = false,
  embed = false,
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
