//import { PanZoomPattern as ShowPattern } from 'shared/components/workbench/pan-zoom-pattern.mjs'
//import { DraftMenu, ns as menuNs } from './menu.mjs'
//import { PatternWithMenu } from '../pattern-with-menu.mjs'
//import { DraftHeader, ns as headerNs } from './header.mjs'

/**
 * The draft view allows users to tweak their pattern
 *
 * @param {object} props - The component's props
 * @param {function} props.Design - The design constructor
 * @param {object} props.state - The ViewWrapper state object
 * @param {object} props.state.settings - The current settings
 * @param {object} props.update - Helper object for updating the ViewWrapper state
 * @param {array} props.missingMeasurements - List of missing measurements for the current design
 * @param {object} props.components - The possibly swizzled components
 * @param {object} props.methods - The possibly swizzled methods
 * @param {function} props.methods.t - The translation method
 * @param {object} props.config - The possibly swizzled pattern editor configuration
 * @param {object} props.locale - The language code (locale) currently used
 * @return {function} MeasurementsView - React component
 */
export const DraftView = (props) => {
  // Passed down regular props
  const { Design, missingMeasurements, update, control } = props
  // Passed down components
  const {
    Accordion,
    Popout,
    MeasurementsEditor,
    MeasurementsSetIcon,
    UserSetPicker,
    BookmarkIcon,
    BookmarkedSetPicker,
    CuratedMeasurementsSetIcon,
    CuratedSetPicker,
    EditIcon,
    PatternLayout,
    ZoomablePattern,
  } = props.components
  // Passed down methods
  const { t, designMeasurements, capitalize, draft } = props.methods
  // Passed down hooks
  const { useBackend, useAccount } = props.hooks
  // Passed down ViewWrapper state
  const { settings, ui } = props.state

  /*
   * First, attempt to draft
   */
  const { pattern, errors, failure } = draft(Design, settings)
  console.log({ pattern, errors, failure })

  let output = null
  let renderProps = false
  if (ui.renderer === 'svg') {
    try {
      const __html = pattern.render()
      output = (
        <ZoomablePattern>
          <div className="w-full h-full" dangerouslySetInnerHTML={{ __html }} />
        </ZoomablePattern>
      )
    } catch (err) {
      console.log(err)
    }
  } else {
    renderProps = pattern.getRenderProps()
    output = (
      <ZoomablePattern {...{ renderProps }} Design={Design} patternLocale={settings.locale} />
    )
  }

  return (
    <PatternLayout
      state={props.state}
      components={props.components}
      {...{ update, control, Design, pattern: output }}
    />
  )
}
/*
        menu: (
          <DraftMenu
            {...{
              Design,
              pattern,
              patternConfig,
              settings,
              ui,
              update,
              language,
              renderProps,
              view,
              setView,
              flags: pattern.setStores?.[0]?.plugins?.['plugin-annotations']?.flags,
            }}
          />
        ),

*/
