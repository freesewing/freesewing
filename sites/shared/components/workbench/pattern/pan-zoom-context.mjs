import React, { useState, useMemo, useCallback } from 'react'

/**
 * A context for managing zoom state of a {@see PanZoomPattern}
 * Allows transform handlers to be available in components outside of the TransformWrapper without a bunch of prop drilling
 * */
export const PanZoomContext = React.createContext({})

/** Provider for the {@see PanZoomContext} */
export const PanZoomContextProvider = ({ children }) => {
  const [zoomed, setZoomed] = useState(false)
  const [zoomFunctions, _setZoomFunctions] = useState(false)

  const setZoomFunctions = useCallback(
    (zoomInstance) => {
      const reset = () => {
        setZoomed(false)
        zoomInstance.resetTransform()
      }

      if (zoomInstance) {
        const { zoomIn, zoomOut, resetTransform } = zoomInstance
        _setZoomFunctions({ zoomIn, zoomOut, resetTransform, reset })
      }
    },
    [_setZoomFunctions, setZoomed]
  )

  const onTransformed = useCallback(
    (_ref, state) => {
      setZoomed(state.scale !== 1)
    },
    [setZoomed]
  )

  const value = useMemo(() => {
    return {
      zoomed,
      zoomFunctions,
      setZoomFunctions,
      onTransformed,
    }
  }, [zoomed, zoomFunctions, setZoomFunctions, onTransformed])

  return <PanZoomContext.Provider value={value}>{children}</PanZoomContext.Provider>
}
