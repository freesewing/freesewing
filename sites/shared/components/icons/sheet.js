/*
 * These icons are kept out of the consolidated icons file because they use different props
 * I think we should move them to the component where they are used, for I don't think
 * they are used anywhere else, so there's little use in having them here
 */
const SheetIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z"
      />
    </svg>
  )
}

export default SheetIcon
