/*
 * These icons are kept out of the consolidated icons file because they use different props
 * I think we should move them to the component where they are used, for I don't think
 * they are used anywhere else, so there's little use in having them here
 */
const Triangle = ({ transform = 'translate(0,0)', fill = 'currentColor' }) => (
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    transform={transform}
    style={{ fill }}
    transform-origin="12 12"
    d="M1 12m9 3m-6 4h2c3 0 3 -3 3-3L9 3c-0-1.732 -2.25-2.6125 -3.325 -.77L2 16c-.77 1.333.192 3 1.732 3z"
  />
)

const Line = () => (
  <path strokeLinecap="round" strokeLinejoin="round" transform="translate(12, 2)" d="M0 0L0 20" />
)

export const FlipIconInner = ({ x = 0, y = 0, rotate = 0, ...style }) => (
  <g transform={`translate(${x},${y}) rotate(${rotate})`} transform-origin="12 12" style={style}>
    <Triangle fill="none" transform="translate(0, 2.5)" />
    <Line />
    <Triangle transform="scale(-1,1) translate(0,2.5)" />
  </g>
)

const FlipIcon = ({ className = 'h-6 w-6' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <FlipIconInner></FlipIconInner>
    </svg>
  )
}

export default FlipIcon
