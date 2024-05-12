/**
 * The error view is loaded if and only an error occurs that we can't handle
 */
export const ErrorView = ({ setView, t, state }) => (
  <div className="text-center mt-8">
    <h2>{t('oops')}</h2>
    <p>FIXME: Something went wrong</p>
    <pre>{JSON.stringify(state, null, 2)}</pre>
  </div>
)
