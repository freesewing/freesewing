import React, { useState, useMemo, useCallback, forwardRef, useContext } from 'react'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'

/*
 * A pattern you can pan and zoom
 */
export const ZoomablePattern = forwardRef(function ZoomablePatternRef(props, ref) {
  const { renderProps, Swizzled, rotate } = props
  const { onTransformed, setZoomFunctions } = useContext(ZoomContext)

  return (
    <TransformWrapper
      minScale={0.1}
      centerZoomedOut={true}
      wheel={{ activationKeys: ['Control'] }}
      doubleClick={{ mode: 'reset' }}
      onTransformed={onTransformed}
      onInit={setZoomFunctions}
    >
      <TransformComponent
        wrapperStyle={{ width: '100%', height: '100%' }}
        contentStyle={{ width: '100%', height: '100%' }}
        wrapperClass={'pan-zoom-pattern'}
        id="pan-zoom-pattern"
      >
        {props.children || (
          <Swizzled.components.Pattern
            {...{ renderProps }}
            t={Swizzled.methods.t}
            ref={ref}
            className={`freesewing pattern w-full ${rotate ? '-rotate-90' : ''}`}
          />
        )}
      </TransformComponent>
    </TransformWrapper>
  )
})

/*
 * Context
 */

/**
 * A context for managing zoom state of a ZoomablePattern
 * Makes transform handlers to be available in components
 */
const ZoomContext = React.createContext({})

/**
 * Provider for the ZoomContext
 */
export const ZoomContextProvider = ({ children }) => {
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

  return <ZoomContext.Provider value={value}>{children}</ZoomContext.Provider>
}
