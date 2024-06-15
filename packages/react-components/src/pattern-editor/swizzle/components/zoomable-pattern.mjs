import React, { useState, useMemo, useCallback, forwardRef, useContext } from 'react'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'

/*
 * A pattern you can pan and zoom
 */
export const ZoomablePattern = forwardRef((props, ref) => {
  const { components, locale, renderProps } = props
  const { Pattern } = components
  //const { renderProps = false, components = {}, design, patternLocale } = props
  //const { locale } = useRouter()

  //const { i18n } = useTranslation([design, ...ns])
  /*
   * We setup a dedicated i18n instance here that is configured to handle
   * pattern translation. This is required because the UI languauge and
   * pattern language can be different, and setting the pattern
   * language on the i18n instance here would change the entire UI language
   * (which is not what we want).
   *
   * But even if both languages are the same, we still want to setup a
   * dedicated instance because we want to load the current design's namespace
   * as the default, and add the plugin namespaces and so on.
   *
   * In other words, translation inside patterns is more complex than the UI
   * so we need this specific 'p18n' instance. To create it, we clone the
   * UI instance, and then set some specific options.
   */
  //const p18n = i18n.cloneInstance({
  //  lng: patternLocale, // The pattern locale, passed down as a prop
  //  fallbackLng: locale, // The UI locale, from the router
  //  ns: [design, ...pns], // A list of namespaces optimized for designs
  //  defaultNS: design, // Set the default namespace to the design
  //})
  //// Now set the languauge to the pattern language
  //p18n.changeLanguage(patternLocale)

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
          <Pattern
            {...{ renderProps }}
            t={props.methods.t}
            ref={ref}
            className="freesewing pattern w-full"
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
