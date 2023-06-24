import { useContext, useState, useEffect, useCallback } from 'react'
import { ModalContext } from 'shared/context/modal-context.mjs'
import { ModalWrapper } from 'shared/components/wrappers/modal.mjs'
import { CloseIcon, WrenchIcon } from 'shared/components/icons.mjs'
import { shownHeaderSelector } from 'shared/components/wrappers/header.mjs'

export const MenuWrapper = ({ children }) => {
  const { setModal, clearModal, modalContent } = useContext(ModalContext)
  const [modalOpen, setModalOpen] = useState(false)

  const Modal = useCallback(
    (props) => {
      const closeModal = () => {
        setModalOpen(false)
        clearModal()
      }

      return (
        <ModalWrapper slideFrom="right" keepOpenOnClick keepOpenOnSwipe>
          <div className="mb-16">{children}</div>
          <button
            className="btn btn-primary btn-circle fixed bottom-4 right-4"
            onClick={closeModal}
          >
            <CloseIcon />
          </button>
        </ModalWrapper>
      )
    },
    [children]
  )

  useEffect(() => {
    if (!modalOpen) return

    setModal(Modal)
  }, [modalOpen, Modal])

  useEffect(() => {
    if (modalContent === null) setModalOpen(false)
  }, [modalContent])

  const onClick = () => {
    setModalOpen(true)
  }

  return (
    <>
      <button
        className={`btn btn-primary btn-circle sticky  m-4 bottom-16 self-end lg:hidden`}
        onClick={onClick}
      >
        <WrenchIcon />{' '}
      </button>
      <div className="hidden lg:block w-1/3 shrink grow-0 lg:p-4 max-w-2xl h-full overflow-scroll">
        {children}
      </div>
    </>
  )
}
