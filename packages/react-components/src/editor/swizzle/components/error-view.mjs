/**
 * The error view is loaded if and only an error occurs that we can't handle
 *
 * @param {object} props - The component's props
 * @param {object} props.Swizzled - Swizzled code
 * @param {function} props.Design - The design constructor
 * @param {object} props.state - The ViewWrapper state object
 * @param {object} props.state.settings - The current settings
 * @param {object} props.update - Helper object for updating the ViewWrapper state
 * @param {array} props.missingMeasurements - List of missing measurements for the current design
 * @param {object} props.components - The possibly swizzled components
 * @param {object} props.methods - The possibly swizzled methods
 * @param {function} props.methods.t - The translation method
 * @param {object} props.config - The possibly swizzled pattern editor configuration
 * @return {function} MeasurementsView - React component
 */
export const ErrorView = ({ Swizzled, state }) => (
  <div className="text-center mt-8">
    <h2>{Swizzled.methods.t('oops')}</h2>
    <p>FIXME: Something went wrong</p>
    <pre>{JSON.stringify(state, null, 2)}</pre>
  </div>
)
