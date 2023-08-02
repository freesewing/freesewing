import { fail, ohno, shrug, shrug2, yay } from './poses.mjs'

const poses = {
  fail,
  ohno,
  shrug,
  shrug2,
  yay,
}

export const Robot = ({ viewBox = '0 0 500 500', className = 'w-full', pose = 'yay' }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox={viewBox || '0 0 500 500'}>
    <path stroke="none" fill={'currentColor'} d={poses[pose]} />
  </svg>
)
