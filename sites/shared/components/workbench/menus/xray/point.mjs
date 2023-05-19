import { Ul, Li, NoSumDiv, Deg } from 'shared/components/workbench/menus/index.mjs'
import { round } from 'shared/utils'
import { XrayAttributes } from './attributes'

export const XrayPoint = ({ pointName, partName, draft, t }) => {
  const point = draft?.parts?.[partName]?.points?.[pointName]

  return point ? (
    <Ul>
      {['x', 'y'].map((coord) => (
        <Li key={coord}>
          <NoSumDiv>
            <Deg />
            <span className="font-bold mr-2">{coord} =</span>
            <span>{round(point[coord])}</span>
          </NoSumDiv>
        </Li>
      ))}
      <XrayAttributes attr={point.attributes} t={t} />
    </Ul>
  ) : null
}
