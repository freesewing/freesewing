const Right = props => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
</svg>
)
const Left = props => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
</svg>
)

const Header = ({ app }) => {
  return (
      <header className={`
        bg-primary
        p-4
        block
        sm:hidden
        z-10
      `}>
          <button
            className={`
              btn border-base-100 text-base-100 btn-sm border border-transparent bg-transparent
              hover:border hover:bg-transparent hover:border-base-100
            `}
            onClick={app.togglePrimaryMenu}>
              {app.primaryMenu
                ? <><Left />&nbsp; Hide menu</>
                : <>Show menu &nbsp;<Right /></>
              }
          </button>
      </header>
  )
}

export default Header
