import React, { useState, useMemo, useEffect } from 'react'

/**
 * A context for managing zoom state of a {@see PanZoomPattern}
 * Allows transform handlers to be available in components outside of the TransformWrapper without a bunch of prop drilling
 * */
export const PanZoomContext = React.createContext({})

/** Provider for the {@see PanZoomContext} */
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

/**
 * A component to capture the zoom functions and set them on the zoom context
 * Place this inside of a TransformWrapper child function.
 * See {@see PanZoomPattern} for an example
 * */
export const PanZoomCapture = ({ resetTransform, zoomIn, zoomOut, setZoomFunctions }) => {
  useEffect(() => {
    if (typeof setZoomFunctions === 'function') {
      setZoomFunctions({ resetTransform, zoomIn, zoomOut })
    }
  })

  return <></>
}
