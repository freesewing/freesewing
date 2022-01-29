import { Ul, Li, Details, Summary, NoSumDiv, Deg } from 'shared/components/workbench/menu'
import Attributes from './attributes.js'
import Ops from './path-ops.js'
/*
 * Things to add
 *
 * ops
 */


const XrayPath = ({ path }) => (
  <Ul>
    <Li>
      <NoSumDiv>
        <Deg />
        <span className="font-bold mr-2">Render =</span>
        <span>{JSON.stringify(path.render)}</span>
      </NoSumDiv>
    </Li>
    <Attributes attr={path.attributes} />
    <Ops ops={path.ops} />
  </Ul>
)

export default XrayPath
