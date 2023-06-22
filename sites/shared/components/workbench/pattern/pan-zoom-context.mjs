import React, { useState, useMemo } from 'react'

export const PanZoomContext = React.createContext({})

export const PanZoomContextProvider = ({ children }) => {
  const [zoomed, setZoomed] = useState(false)
  const [_zoomFunctions, setZoomFunctions] = useState(false)

  const value = useMemo(() => {
    const onTransformed = (_ref, state) => {
      setZoomed(state.scale !== 1)
    }

    const reset = () => {
      setZoomed(false)
      _zoomFunctions.resetTransform()
    }

    return {
      zoomed,
      zoomFunctions: _zoomFunctions ? { ..._zoomFunctions, reset } : false,
      setZoomFunctions,
      onTransformed,
    }
  }, [zoomed, setZoomed, _zoomFunctions, setZoomFunctions])

  return <PanZoomContext.Provider value={value}>{children}</PanZoomContext.Provider>
}
