/**
 * The draft view allows users to tweak their pattern
 *
 * @param (object) props - All the props
 * @param {function} props.Design - The design constructor
 * @param {array} props.missingMeasurements - List of missing measurements for the current design
 * @param {object} props.state - The ViewWrapper state object
 * @param {object} props.state.settings - The current settings
 * @param {object} props.update - Helper object for updating the ViewWrapper state
 * @param {object} props.Swizzled - An object holding swizzled code
 * @return {function} DraftView - React component
 */
export const DraftView = ({ Design, missingMeasurements, state, update, Swizzled }) => {
  /*
   * First, attempt to draft
   */
  const { pattern, errors, failure } = Swizzled.methods.draft(Design, state.settings)

  let output = null
  let renderProps = false
  if (state.ui?.renderer === 'svg') {
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
        patternLocale={state.locale || 'en'}
        rotate={state.ui.rotate}
      />
    )
  }

  return (
    <Swizzled.components.PatternLayout
      {...{ update, Design, output, state, pattern }}
      menu={
        state.ui.aside ? (
          <Swizzled.components.DraftMenu {...{ Design, pattern, update, state }} />
        ) : null
      }
    />
  )
}
