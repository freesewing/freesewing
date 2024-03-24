//  __SDEFILE__ - This file is a dependency for the stand-alone environment
// Dependencies
import { forwardRef, useContext } from 'react'
// Hooks
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
// Context
import { PanZoomContext } from 'shared/components/workbench/pattern/pan-zoom-context.mjs'
// Components
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
import { Pattern } from 'pkgs/react-components/src/index.mjs'

/*
 * These are the namespaces used by the UI
 * We defined namespaces for patterns below because the pattern
 * translation will use a different next-i18next instance
 */
export const ns = ['workbench']

/*
 * Pattern namespaces
 */
const pns = ['plugin-annotations']

/*
 * A pattern you can pan and zoom
 */
export const PanZoomPattern = forwardRef((props, ref) => {
  const { renderProps = false, components = {}, design, patternLocale } = props
  const { locale } = useRouter()

  const { i18n } = useTranslation([design, ...ns])
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
  const p18n = i18n.cloneInstance({
    lng: patternLocale, // The pattern locale, passed down as a prop
    fallbackLng: locale, // The UI locale, from the router
    ns: [design, ...pns], // A list of namespaces optimized for designs
    defaultNS: design, // Set the default namespace to the design
  })
  // Now set the languauge to the pattern language
  p18n.changeLanguage(patternLocale)

  const { onTransformed, setZoomFunctions } = useContext(PanZoomContext)

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
            {...{ components, renderProps }}
            t={p18n.t}
            ref={ref}
            className="freesewing pattern w-full"
          />
        )}
      </TransformComponent>
    </TransformWrapper>
  )
})

PanZoomPattern.displayName = 'PanZoomPattern'
