import { Term as SharedTerm } from 'shared/components/jargon.mjs'

/*
 * This object holds jargon terminology for FreeSewing.dev
 *
 * This object holds key/value pairs per language where:
 *   - key: holds the jargon term (make sure to lowercase it and strip dots)
 *   - value: holds the path to the documentation page as when browsing the website
 *
 * To be clear:
 *   - You need to first create a markdown page explaining the term.
 *   - Only afterwards can you add it here
 *   - Since this uses dynamic MDX loaded from GitHub,it won't work until pushed
 */
const jargon = {
  en: {
    cjs: 'reference/terms/cjs',
    esm: 'reference/terms/esm',
    variadic: 'reference/terms/variadic',
  },
}

/*
 * DO NOT CHANGE ANYTHING BELOW THIS LINE
 */
export const Term = ({ children }) => <SharedTerm {...{ jargon, children }} site="dev" />
