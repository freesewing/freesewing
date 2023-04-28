import React, { useState, useContext } from 'react'

export const ModalContext = React.createContext(null)

export const ModalContextProvider = ({ children }) => {
  function clearModal() {
    __setModal({ setModal, clearModal, modalContent: null })
  }

  function setModal(content) {
    __setModal({ setModal, clearModal, modalContent: content })
  }

  const [__modal, __setModal] = useState({
    setModal,
    clearModal,
    modalContent: null,
  })

  return <ModalContext.Provider value={__modal}>{children}</ModalContext.Provider>
}
