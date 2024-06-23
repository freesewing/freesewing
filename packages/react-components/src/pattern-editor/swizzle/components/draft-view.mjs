/**
 * The draft view allows users to tweak their pattern
 *
 * @param (object) props - All the props
 * @param {function} props.Design - The design constructor
 * @param {array} props.missingMeasurements - List of missing measurements for the current design
 * @param {object} props.locale - The language code (locale) currently used
 * @param {object} props.state - The ViewWrapper state object
 * @param {object} props.state.settings - The current settings
 * @param {object} props.update - Helper object for updating the ViewWrapper state
 * @param {object} props.Swizzled - An object holding swizzled code
 * @return {function} DraftView - React component
 */
export const DraftView = ({ Design, locale, missingMeasurements, state, update, Swizzled }) => {
  // Passed down editor state
  const { settings, ui, control } = state

  /*
   * First, attempt to draft
   */
  const { pattern, errors, failure } = Swizzled.methods.draft(Design, settings)

  let output = null
  let renderProps = false
  if (ui.renderer === 'svg') {
    try {
      const __html = pattern.render()
      output = (
        <Swizzled.components.ZoomablePattern>
          <div className="w-full h-full" dangerouslySetInnerHTML={{ __html }} />
        </Swizzled.components.ZoomablePattern>
      )
    } catch (err) {
      console.log(err)
    }
  } else {
    renderProps = pattern.getRenderProps()
    output = (
      <Swizzled.components.ZoomablePattern
        renderProps={renderProps}
        patternLocale={settings.locale}
      />
    )
  }

  return (
    <Swizzled.components.PatternLayout
      {...{ update, control, Design, output, state }}
      menu={<Swizzled.components.DraftMenu {...{ Design, pattern, update, state }} />}
    />
  )
}
