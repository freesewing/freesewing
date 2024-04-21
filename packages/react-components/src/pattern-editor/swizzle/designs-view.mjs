/**
 * The design view is loaded if and only if not design is passed to the editor
 */
export const DesignsView = ({ designs = {}, setView, t }) => (
  <div className="text-center mt-8">
    <h2>{t('pickADesign')}</h2>
    <ul className="flex flex-row flex-wrap gap-2 items-center justify-center max-w-2xl px-8 mx-auto">
      {Object.entries(designs).map(([name, design]) => (
        <li key={design}>
          <button className={`btn btn-primary btn-outline btn-sm capitalize font-bold `}>
            {name}
          </button>
        </li>
      ))}
    </ul>
  </div>
)
