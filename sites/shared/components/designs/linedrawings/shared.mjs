/*
 * A React component to wrap SVG linedrawings for FreeSewing designs
 *
 * @param design {string}     - The (lowercase) name of a FreeSewing design
 * @param className {string}  - CSS classes to set on the svg tag
 *
 * @return LineDrawing as JSX
 */
export const LineDrawingWrapper = ({
  className = 'w-64', // CSS classes to apply
  viewBox = '0 0 100 100', // SVG viewBox
  stroke = 1, // Stroke to use
  children = [], // The actual linedrawing
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox={viewBox}
    strokeWidth={stroke}
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className + ' linedrawing'}
  >
    {children}
  </svg>
)

/*
 * Think stroke-width helper to ensure consistency across linedrawings
 */
export const thin = (stroke = 1) => ({ strokeWidth: stroke / 2 })

/*
 * Think stroke-width helper to ensure consistency across linedrawings
 */
export const veryThin = (stroke = 1) => ({ strokeWidth: stroke / 3 })

/*
 * Dashed stroke-dasharray helper to ensure consistency across linedrawings
 */
export const dashed = (stroke = 1) => ({ strokeDasharray: `${stroke * 1.2},${stroke * 0.8}` })
