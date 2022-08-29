import { Ul, Li, NoSumDiv, Deg } from 'shared/components/workbench/menu'
import { round } from 'shared/utils'
import Attributes from './attributes'

const XrayPoint = ({ pointName, partName, draft, t }) => {
  const point = draft?.parts?.[partName]?.points?.[pointName]

  return point
    ? (
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
        <Attributes attr={point.attributes} t={t} />
      </Ul>
    ) : null
}

export default XrayPoint
