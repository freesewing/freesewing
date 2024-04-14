/*
 * A default (simple) view to pick a design
 * This is only used when no design is set
 *
 * Note: This can be swizzled
 *
 * @param {object} designs - The object holding all designs and their code
 * @param {function} setDesign - Setter to update the design state in the editor
 * @param {function} t - The translation function
 */
export const DesignsView = ({ designs={}, setDesign, t }) => (
  <div className="text-center mt-8">
    <h2>{t('pickADesign')}</h2>
    <ul className="flex flex-row flex-wrap gap-2 items-center justify-center max-w-2xl px-8 mx-auto">
      {Object.entries(designs).map(([name, design]) => (
        <li key={design}>
          <button
            onClick={() => setDesign(name)}
            className={`btn btn-primary btn-outline btn-sm capitalize font-bold `}
          >{name}</button>
        </li>
      ))}
    </ul>
  </div>
)
