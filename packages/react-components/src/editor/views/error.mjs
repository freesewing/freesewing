/*
 * A default (simple) view to display an error
 *
 * Note: This can be swizzled
 *
 * @param {object} designs - The object holding all designs and their code
 * @param {function} setDesign - Setter to update the design state in the editor
 * @param {function} t - The translation function
 */
export const ErrorView = ({ designs={}, setDesign, t }) => (
  <div className="text-center mt-8">
    <h2>{t('oops')}</h2>
    <p>Something went wrong</p>
  </div>
)
