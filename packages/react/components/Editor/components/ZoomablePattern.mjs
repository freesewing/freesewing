import React, { useState, useMemo, useCallback, forwardRef, useContext } from 'react'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
import { Pattern } from '@freesewing/react/components/Pattern'
import { ZoomInIcon, ZoomOutIcon, RotateIcon } from '@freesewing/react/components/Icon'

/*
 * A pattern you can pan and zoom
 */
export const ZoomablePattern = forwardRef(function ZoomablePatternRef(props, ref) {
  const { renderProps, rotate, update, components = {}, strings = {} } = props
  const { onTransformed, zoomFunctions, setZoomFunctions } = useContext(ZoomContext)

  return (
    <div className="tw-relative">
      <div className="tw-absolute tw-top-0 tw-right-0 tw-z-20">
        <div className="tw-flex tw-flex-row tw-gap-1 tw-items-center">
          <button
            onClick={() => props.update.ui('rotate', rotate ? 0 : 1)}
            className="hover:tw-text-secondary"
          >
            <RotateIcon className={`tw-h-6 tw-w-6 ${rotate ? 'tw-text-success' : ''}`} />
          </button>
          <button
            onClick={() => (zoomFunctions.zoomIn ? zoomFunctions.zoomIn() : null)}
            className="hover:tw-text-secondary"
          >
            <ZoomInIcon />
          </button>
          <button
            onClick={() => (zoomFunctions.zoomOut ? zoomFunctions.zoomOut() : null)}
            className="hover:tw-text-secondary"
          >
            <ZoomOutIcon />
          </button>
        </div>
      </div>

      <TransformWrapper
        minScale={0.1}
        centerZoomedOut={true}
        wheel={{ activationKeys: ['Control'] }}
        doubleClick={{ mode: 'reset' }}
        onTransformed={onTransformed}
        onInit={setZoomFunctions}
      >
        <TransformComponent
          wrapperStyle={{ width: '100%', height: 'calc(100vh - 9rem)' }}
          contentStyle={{ width: '100%', height: 'calc(100vh - 9rem)' }}
          wrapperClass={'pan-zoom-pattern'}
          id="pan-zoom-pattern"
        >
          {props.children || (
            <Pattern
              {...{ renderProps, components, strings }}
              ref={ref}
              className={`freesewing pattern tw-w-full ${rotate ? 'tw--rotate-90' : ''}`}
            />
          )}
        </TransformComponent>
      </TransformWrapper>
    </div>
  )
})

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
