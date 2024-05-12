/**
 * The design view is loaded if and only if not design is passed to the editor
 *
 * @param {object} designs - Object holding all designs
 * @param {function} setDesign - Setter from the ViewWrapper React state to set the design
 * @param {function} t - Passed in translation method
 * @return {function} DesignsView - React component
 */
export const DesignsView = ({ designs = {}, setDesign, t }) => (
  <div className="text-center mt-8 mb-24">
    <h2>{t('pe:pickADesign')}</h2>
    <ul className="flex flex-row flex-wrap gap-2 items-center justify-center max-w-2xl px-8 mx-auto">
      {Object.entries(designs).map(([name, design]) => (
        <li key={design}>
          <button
            className={`btn btn-primary btn-outline btn-sm capitalize font-bold `}
            onClick={() => setDesign(design)}
          >
            {name}
          </button>
        </li>
      ))}
    </ul>
  </div>
)
