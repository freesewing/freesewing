export const HeaderWrapper = ({ children }) => (
  <header
    className={`
    fixed bottom-0 left-0 md:relative
    bg-neutral drop-shadow-xl w-full
    border-t border-solid border-base-300 z-20
  `}
  >
    {children}
  </header>
)
