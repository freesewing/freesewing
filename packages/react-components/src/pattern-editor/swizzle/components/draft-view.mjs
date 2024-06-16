/**
 * The draft view allows users to tweak their pattern
 *
 * @param (object) props - All the props
 * @param {function} props.Design - The design constructor
 * @param {array} props.missingMeasurements - List of missing measurements for the current design
 * @param {object} props.locale - The language code (locale) currently used
 * @param {object} props.state - The ViewWrapper state object
 * @param {object} props.swizzled - An object with swizzled components, hooks, methods, config, and defaults
 * @param {object} props.state.settings - The current settings
 * @param {object} props.update - Helper object for updating the ViewWrapper state
 * @return {function} DraftView - React component
 */
export const DraftView = ({ Design, locale, missingMeasurements, state, swizzled, update }) => {
  // Swizzled components
  const {
    Accordion,
    DraftMenu,
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
  } = swizzled.components
  // Swizzled methods
  const { t, designMeasurements, capitalize, draft } = swizzled.methods
  // Swizzled hooks
  const { useBackend, useAccount } = swizzled.hooks
  // Passed down editor state
  const { settings, ui, control } = state

  /*
   * First, attempt to draft
   */
  const { pattern, errors, failure } = draft(Design, settings)

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
    output = <ZoomablePattern renderProps={renderProps} patternLocale={settings.locale} />
  }

  return (
    <PatternLayout
      {...{ update, control, Design, output, state, swizzled }}
      menu={<DraftMenu {...{ Design, pattern, update, state, swizzled }} />}
    />
  )
}
