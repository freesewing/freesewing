import { useContext, useState, useEffect, useCallback } from 'react'
import { ModalContext } from 'shared/context/modal-context.mjs'
import { ModalWrapper } from 'shared/components/wrappers/modal.mjs'
import { CloseIcon, WrenchIcon } from 'shared/components/icons.mjs'

const defaultClasses = 'w-1/3 shrink grow-0 lg:p-4 max-w-2xl h-full overflow-scroll'
const defaultButtonClasses = 'bottom-24 mb-16'
export const MenuWrapper = ({
  children,
  wrapperClass = defaultClasses,
  buttonClass = defaultButtonClasses,
  Icon = WrenchIcon,
  keepOpenOnClick = true,
}) => {
  const { setModal, clearModal, modalContent } = useContext(ModalContext)
  const [modalOpen, setModalOpen] = useState(false)

  const Modal = useCallback(() => {
    const closeModal = () => {
      setModalOpen(false)
      clearModal()
    }

    return (
      <ModalWrapper slideFrom="right" keepOpenOnClick={keepOpenOnClick} keepOpenOnSwipe>
        <div className="mb-16">{children}</div>
        <button className="btn btn-accent btn-circle fixed bottom-4 right-4" onClick={closeModal}>
          <CloseIcon />
        </button>
      </ModalWrapper>
    )
  }, [children, clearModal, keepOpenOnClick])

  useEffect(() => {
    if (!modalOpen) return

    setModal(Modal)
  }, [modalOpen, Modal, setModal])

  useEffect(() => {
    if (modalContent === null) setModalOpen(false)
  }, [modalContent, setModalOpen])

  const onClick = () => {
    setModalOpen(true)
  }

  return (
    <>
      <button
        className={`btn btn-accent btn-circle m-4 z-20 lg:hidden -ml-16 self-end ${buttonClass} sticky`}
        onClick={onClick}
      >
        <Icon />{' '}
      </button>
      <div className={`hidden lg:block ${wrapperClass}`}>{children}</div>
    </>
  )
}
