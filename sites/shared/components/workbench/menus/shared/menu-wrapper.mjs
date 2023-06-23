import { useContext, useState, useEffect, useCallback } from 'react'
import { ModalContext } from 'shared/context/modal-context.mjs'
import { ModalWrapper } from 'shared/components/wrappers/modal.mjs'
import { CloseIcon } from 'shared/components/icons.mjs'
import { shownHeaderSelector } from 'shared/components/wrappers/header.mjs'

export const MenuWrapper = ({ Icon, children, childProps }) => {
  const { setModal, clearModal, setModalProps, modalContent } = useContext(ModalContext)
  const [modalOpen, setModalOpen] = useState(false)

  const Modal = useCallback(
    (props) => {
      const closeModal = () => {
        setModalOpen(false)
        clearModal()
      }

      return (
        <ModalWrapper slideFrom="right" keepOpenOnClick keepOpenOnSwipe>
          {children(props)}
          <button
            className="btn btn-primary btn-circle sticky bottom-2 float-right"
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

    setModal(Modal, childProps)
  }, [childProps, modalOpen, Modal])

  useEffect(() => {
    if (modalContent === null) setModalOpen(false)
  }, [modalContent])

  const onClick = () => {
    setModalOpen(true)
  }

  return (
    <>
      <div className="hidden lg:block">{children(childProps)}</div>
      <div className="lg:hidden">
        <button className={`btn btn-primary btn-circle fixed right-2 bottom-16`} onClick={onClick}>
          <Icon />{' '}
        </button>
      </div>
    </>
  )
}
