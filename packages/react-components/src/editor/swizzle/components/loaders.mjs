/**
 * A temporary loader 'one moment please' style
 * Just a spinner in this case, but could also be branded.
 */
export const TemporaryLoader = ({ Swizzled = false }) =>
  Swizzled ? <Swizzled.components.Spinner /> : <div className="text-center m-auto">...</div>
