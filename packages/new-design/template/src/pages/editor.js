import { BareLayout } from '@site/src/components/bare-layout.mjs'
import { Editor } from '@freesewing/react/components/Editor'

/*
 * This hinges on two things:
 * - BareLayout: Gives us a docusaurus header/footer and so on, but the full page for content
 * - Editor: FreeSewing's drop-in pattern editor
 */
const EditorPage = () => (
  <BareLayout>
    <Editor />
  </BareLayout>
)

export default EditorPage
