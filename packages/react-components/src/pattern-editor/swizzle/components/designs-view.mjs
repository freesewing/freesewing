/**
 * The design view is loaded if and only if not design is passed to the editor
 *
 * @param {Object} props - All the props
 * @param {Object} designs - Object holding all designs
 * @param {Object} props.swizzled - An object with swizzled components, hooks, methods, config, and defaults
 * @param {Object} update - ViewWrapper state update object
 */
export const DesignsView = ({ designs = {}, swizzled, update }) => (
  <div className="text-center mt-8 mb-24">
    <h2>{swizzled.methods.t('pe:chooseADesign')}</h2>
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
