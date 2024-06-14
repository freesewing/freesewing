/**
 * The design view is loaded if and only if not design is passed to the editor
 *
 * @param {object} designs - Object holding all designs
 * @param {object} methods - Object holding methods that can be swizzled
 * @param {function} methods.t - Translation method
 * @param {object} update - ViewWrapper state update object
 * @param {function} update.design - Setter from the ViewWrapper React state to set the design
 * @return {function} DesignsView - React component
 */
export const DesignsView = ({ designs = {}, methods, update }) => (
  <div className="text-center mt-8 mb-24">
    <h2>{methods.t('pe:chooseADesign')}</h2>
    <ul className="flex flex-row flex-wrap gap-2 items-center justify-center max-w-2xl px-8 mx-auto">
      {Object.entries(designs).map(([name, design]) => (
        <li key={name}>
          <button
            className={`btn btn-primary btn-outline btn-sm capitalize font-bold `}
            onClick={() => {
              update.design(name)
              update.view()
            }}
          >
            {name}
          </button>
        </li>
      ))}
    </ul>
  </div>
)
