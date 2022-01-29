import { Ul, Li, Details, Summary, NoSumDiv, Deg } from 'shared/components/workbench/menu'
import { round } from 'shared/utils.js'
import Attributes from './attributes.js'

const XrayPoint = ({ point }) => (
  <Ul>
    {['x', 'y'].map(coord => (
      <Li key={coord}>
        <NoSumDiv>
          <Deg />
          <span className="font-bold mr-2">{coord} =</span>
          <span>{round(point[coord])}</span>
        </NoSumDiv>
      </Li>
    ))}
    <Attributes attr={point.attributes} />
  </Ul>
)

export default XrayPoint
