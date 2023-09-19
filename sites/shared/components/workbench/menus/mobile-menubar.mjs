import { useContext, useState, useEffect } from 'react'
import { ModalContext } from 'shared/context/modal-context.mjs'
import { ModalWrapper } from 'shared/components/wrappers/modal.mjs'
import { CloseIcon } from 'shared/components/icons.mjs'
import { MobileMenubarContext } from 'shared/context/mobile-menubar-context.mjs'
import { MenuAltIcon } from 'shared/components/icons.mjs'

/**
 * A component to display menu buttons and actions in mobile.
 * Draws its contents from items added to the {@link MobileMenubarContext}
 * @returns
 */
export const MobileMenubar = () => {
  const { setModal, clearModal, modalContent } = useContext(ModalContext)
  const { menus, actions } = useContext(MobileMenubarContext)
  const [selectedModal, setSelectedModal] = useState(false)

  // get the content of the selected modal because this is what will be changing if there are updates
  const selectedMenu = menus[selectedModal]

  // when the content changes, or the selection changes
  useEffect(() => {
    // there's no selected modal, we're in the clear
    if (!selectedModal) return

    // generate a new modal with the content
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
          fullWidth
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

    // set it
    setModal(Modal)
  }, [selectedMenu, selectedModal, clearModal, setModal])

  // clear the selection if the modal was cleared externally
  useEffect(() => {
    if (modalContent === null) {
      setSelectedModal(false)
    }
  }, [modalContent, setSelectedModal])

  return (
    <div
      className={`
      lg:hidden
      sticky bottom-0 w-20 -ml-20 self-end
      duration-300 transition-all
      flex flex-col-reverse gap-2 mb-2
      z-20
      mobile-menubar
      `}
    >
      {Object.keys(menus)
        .sort((a, b) => menus[a].order - menus[b].order)
        .map((m) => {
          const Icon = m === 'nav' ? MenuAltIcon : menus[m].Icon
          return (
            <button
              key={m}
              className={`btn ${m === 'nav' ? 'btn-neutral' : 'btn-primary'} btn-circle mx-4`}
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
