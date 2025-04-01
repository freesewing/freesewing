import React, { createContext, useState } from 'react'

/*
 * The actual context
 */
export const ModalContext = createContext(null)

/*
 * The context provider
 */
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
