/*
 * These icons are kept out of the consolidated icons file because they use different props
 * I think we should move them to the component where they are used, for I don't think
 * they are used anywhere else, so there's little use in having them here
 */
export const RotateIconInner = ({ flipX = false }) => (
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
    transform={flipX ? 'scale(-1,1)' : ''}
    transform-origin="12 12"
  />
)

const RotateIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <RotateIconInner></RotateIconInner>
    </svg>
  )
}

export default RotateIcon
