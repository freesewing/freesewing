import React, { useState } from 'react'

export const ModalContext = React.createContext(null)

export const ModalContextProvider = ({ children }) => {
  function clearModal(fromSwipe = false) {
    __setModal({
      ...__modal,
      modalContent: null,
      modalProps: {},
    })
  }

  function setModal(content, props = {}) {
    __setModal({
      ...__modal,
      modalContent: content,
      modalProps: props,
    })
  }

  function setModalProps(props = {}) {
    __setModal({
      ...__modal,
      modalProps: props,
    })
  }

  const [__modal, __setModal] = useState({
    setModal,
    clearModal,
    setModalProps,
    modalContent: null,
    modalProps: {},
  })

  return <ModalContext.Provider value={__modal}>{children}</ModalContext.Provider>
}
