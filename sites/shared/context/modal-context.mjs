import { createContext, useState } from 'react'

export const ModalContext = createContext(null)

export const ModalContextProvider = ({ children }) => {
  function clearModal() {
    __setModal({
      ...__modal,
      modalContent: null,
    })
  }

  function setModal(content) {
    __setModal({
      ...__modal,
      modalContent: content,
    })
  }

  const [__modal, __setModal] = useState({
    setModal,
    clearModal,
    modalContent: null,
  })

  return <ModalContext.Provider value={__modal}>{children}</ModalContext.Provider>
}
