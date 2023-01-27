import Spinner from 'shared/components/icons/spinner.js'

const Loader = () => (
  <div
    className={`
    fixed top-0 left-0 right-0 w-screen h-screen
    hover:cursor-pointer flex flex-col justify-center
    `}
  >
    <div
      className="m-auto lightbox bg-neutral bg-opacity-0 p-4 mask mask-squircle"
      style={{
        maxHeight: 'calc(100vh - 6rem)',
        maxWidth: 'calc(100vw - 6rem)',
      }}
    >
      <Spinner className="h-12 w-12 animate-spin text-primary" />
    </div>
  </div>
)

export default Loader
