import { useState } from 'react'

const Modal = ({ cancel, children }) => {

  const [ modal, setModal ] = useState(false)

  if (modal) return (
    <div className={`
      fixed top-0 left-0 right-0 w-screen h-screen
      bg-neutral bg-opacity-90 z-30
      hover:cursor-zoom-out flex flex-col justify-center
      `} onClick={() => setModal(false)}>
        <div className="m-auto text-neutral-content lightbox" style={{
          maxHeight: "calc(100vh - 6rem)",
          maxWidth: "calc(100vw - 6rem)",
        }}>
          {children}
        </div>
    </div>
  )

  return (
    <div
      onClick={() => setModal(!modal)}
      className="hover:cursor-zoom-in"
    >{children}</div>
  )
}

export default Modal
