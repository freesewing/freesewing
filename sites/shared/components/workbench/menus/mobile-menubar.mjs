import { useContext, useState, useEffect } from 'react'
import { ModalContext } from 'shared/context/modal-context.mjs'
import { ModalWrapper } from 'shared/components/wrappers/modal.mjs'
import { CloseIcon } from 'shared/components/icons.mjs'
import { MobileMenubarContext } from 'shared/context/mobile-menubar-context.mjs'
import { shownHeaderSelector } from 'shared/components/wrappers/header.mjs'

export const MobileMenubar = () => {
  const { setModal, clearModal, modalContent } = useContext(ModalContext)
  const { menus, actions } = useContext(MobileMenubarContext)
  const [selectedModal, setSelectedModal] = useState(false)

  const selectedMenu = menus[selectedModal]

  useEffect(() => {
    // there's no selected modal, we're in the clear
    if (!selectedModal) return

    // otherwise, set the modal and keep an internal record of having opened it
    const Modal = () => {
      const closeModal = () => {
        setSelectedModal(false)
        clearModal()
      }

      return (
        <ModalWrapper
          slideFrom="right"
          keepOpenOnClick={selectedMenu.keepOpenOnClick}
          keepOpenOnSwipe
        >
          <div className="mb-16">{selectedMenu.menuContent}</div>
          <button
            className="btn btn-accent btn-circle fixed bottom-4 right-4 z-20"
            onClick={closeModal}
          >
            <CloseIcon />
          </button>
        </ModalWrapper>
      )
    }

    setModal(Modal)
  }, [selectedMenu, selectedModal, clearModal, setModal])

  useEffect(() => {
    if (modalContent === null) {
      setSelectedModal(false)
    }
  }, [modalContent, setSelectedModal])

  return (
    <div
      className={`
    lg:hidden
    ${shownHeaderSelector('bottom-16')} 
    sticky bottom-0 w-20 -ml-20 self-end
    duration-300 transition-all 
    flex flex-col-reverse gap-4
    z-20
    mobile-menubar
    `}
    >
      {Object.keys(menus)
        .sort((a, b) => menus[a].order - menus[b].order)
        .map((m) => {
          const Icon = menus[m].Icon
          return (
            <button
              key={m}
              className="btn btn-accent btn-circle mx-4"
              onClick={() => setSelectedModal(m)}
            >
              <Icon />
            </button>
          )
        })}
      {Object.keys(actions)
        .sort((a, b) => actions[a].order - actions[b].order)
        .map((a) => (
          <div key={a}>{actions[a].actionContent}</div>
        ))}
    </div>
  )
}
