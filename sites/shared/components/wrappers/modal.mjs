export const ModalWrapper = ({
  app,
  children,
  flex = 'row',
  justify = 'center',
  items = 'center',
  bg = 'base-100 lg:bg-base-300',
  bgOpacity = '100 lg:bg-opacity-95',
  bare = false,
  keepOpenOnClick = false,
}) => (
  <div
    className={`fixed top-0 left-0 m-0 p-0 shadow w-full h-screen
        bg-${bg} bg-opacity-${bgOpacity} z-50 hover:cursor-pointer
        flex flex-${flex} justify-${justify} overflow-auto items-${items}`}
    onClick={keepOpenOnClick ? null : () => app.updateState('modal', false)}
  >
    {bare ? (
      children
    ) : (
      <div className="bg-base-100 p-4 lg:px-8 lg:rounded-lg lg:shadow-lg">{children}</div>
    )}
  </div>
)
