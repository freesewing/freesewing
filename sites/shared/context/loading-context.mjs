import React, { useState } from 'react'

export const LoadingContext = React.createContext(false)

export const LoadingContextProvider = ({ children }) => {
  function stopLoading() {
    __setLoading({ ...__loading, loading: false })
  }
  function startLoading() {
    __setLoading({ ...__loading, loading: true })
  }
  function setLoading(loading) {
    __setLoading({ ...__loading, loading })
  }

  const [__loading, __setLoading] = useState({
    setLoading,
    startLoading,
    stopLoading,
    loading: false,
  })

  return <LoadingContext.Provider value={__loading}>{children}</LoadingContext.Provider>
}
