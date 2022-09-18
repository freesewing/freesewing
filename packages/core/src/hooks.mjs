/**
 * Returns an object holding the defaults hooks structure
 *
 * @constructor
 * @return {object} hooks - The default hooks holding structure
 */
export function Hooks() {
  return {
    preInit: [],
    postInit: [],
    preDraft: [],
    preSetDraft: [],
    prePartDraft: [],
    postPartDraft: [],
    postSetDraft: [],
    postDraft: [],
    preSample: [],
    postSample: [],
    preRender: [],
    postLayout: [],
    postRender: [],
    insertText: [],
  }
}
