import { useContext, useState } from 'react'
import { ModalContext } from 'shared/context/modal-context.mjs'
import { ModalWrapper } from 'shared/components/wrappers/modal.mjs'

export const Lightbox = ({ children, buttonClasses = '', boxClasses = false, modalProps = {} }) => {
  const { setModal } = useContext(ModalContext)
  const [box, setBox] = useState(false)

  if (box)
    return (
      <div
        className={`
      fixed top-0 left-0 right-0 w-screen h-screen
      bg-neutral bg-opacity-90 z-30
      hover:cursor-zoom-out flex flex-col justify-center
      `}
        onClick={() => setBox(false)}
      >
        <div
          className="m-auto text-neutral-content lightbox"
          style={{
            maxHeight: 'calc(100vh - 6rem)',
            maxWidth: 'calc(100vw - 6rem)',
          }}
        >
          {children}
        </div>
      </div>
    )

  return (
    <button
      onClick={() =>
        setModal(
          <ModalWrapper
            flex="col"
            justify="top lg:justify-center"
            slideFrom="right"
            {...modalProps}
          >
            {boxClasses ? <div className={boxClasses}>{children}</div> : children}
          </ModalWrapper>
        )
      }
      className={buttonClasses}
    >
      {children}
    </button>
  )
}

//<button onClick={() => setBox(!box)} className={`hover:cursor-zoom-in ${className}`}>
