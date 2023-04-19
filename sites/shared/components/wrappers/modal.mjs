import { useState, useEffect } from 'react'

export const ModalWrapper = ({
  app,
  children = null,
  flex = 'row',
  justify = 'center',
  items = 'center',
  bg = 'base-100 lg:bg-base-300',
  bgOpacity = '100 lg:bg-opacity-95',
  bare = false,
  keepOpenOnClick = false,
}) => {
  const [animate, setAnimate] = useState(true)

  useEffect(() => {
    if (animate) setAnimate(false)
  }, [children, animate])

  return (
    <div
      className={`fixed top-0 left-0 m-0 p-0 shadow w-full h-screen
        transform-all duration-100
        ${animate ? 'opacity-0 -translate-x-full lg:translate-x-0' : 'opacity-100 -translate-x-0'}
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
}
