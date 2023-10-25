/*
 * The default jargon transform provided by rehype-jargon
 * is kinda basic because this is a package we publish/maintain
 * for others.
 * This one is more opinionated but assumes the use of TailwindCSS
 * so we can't make it the default
 */
export const jargonTransform = (term, html) => `<details class="inline jargon-details">
  <summary class="jargon-term">
    ${term}
    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 jargon-close" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M6 18L18 6M6 6l12 12" />
    </svg>
  </summary>
  <div class="jargon-info">
  ${html}</div></details>`
