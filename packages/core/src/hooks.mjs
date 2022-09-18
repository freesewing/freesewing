/**
 * Returns an object holding the defaults hooks structure
 *
 * @constructor
 * @return {object} hooks - The default hooks holding structure
 */
export function Hooks() {
  return {
    preDraft: [],
    postDraft: [],
    preSample: [],
    postSample: [],
    preRender: [],
    postLayout: [],
    postRender: [],
    insertText: [],
  }
}
