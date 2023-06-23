import React, { useState } from 'react'

export const ModalContext = React.createContext(null)

export const ModalContextProvider = ({ children }) => {
  function clearModal(fromSwipe = false) {
    __setModal({
      ...__modal,
      modalContent: null,
    })
  }

  function setModal(content, props = {}) {
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
