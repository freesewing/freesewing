import { Term as SharedTerm } from 'shared/components/jargon.mjs'

/*
 * This object holds jargon terminology for FreeSewing.lab
 *
 * - No actual jargon should be added to this file. Instead, add your
 *   jargon to the org and dev files.
 * - This file simply needs to exist in order for the lab development
 *   environment to run.
 */
const jargon = {}

/*
 * DO NOT CHANGE ANYTHING BELOW THIS LINE
 */
export const Term = ({ children }) => <SharedTerm {...{ jargon, children }} site="lab" />
