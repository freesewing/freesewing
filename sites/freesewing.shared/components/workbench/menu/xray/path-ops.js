import { Chevron } from 'shared/components/navigation/primary.js'
import { Ul, Li, Details, Summary, SumDiv, NoSumDiv, Deg } from 'shared/components/workbench/menu'
import { round } from 'shared/utils.js'
import Point from './point.js'

const MoveLine = ({ op }) => <Point point={op.to} />
const Curve = ({ op }) => ['cp1', 'cp2', 'to'].map(pnt => (
  <Li key={pnt}>
    <Details>
      <Summary>
        <SumDiv>
          <Deg />
          <span className="font-bold">{pnt}</span>
        </SumDiv>
        <Chevron />
      </Summary>
      <Point point={op[pnt]} />
    </Details>
  </Li>
))
const Close = () => (
  <p>Close</p>
)

const XrayPathOp = ({ op }) => (
  <Li>
  {op.type === 'close'
    ? (
      <NoSumDiv>
        <Deg />
        <span className="font-bold">{op.type}</span>
      </NoSumDiv>
    ) : (
      <Details>
        <Summary>
          <SumDiv>
            <Deg />
            <span className="font-bold">{op.type}</span>
            <span>To</span>
          </SumDiv>
          <Chevron />
        </Summary>
        <Ul>
          {op.type === 'curve'
            ? <Curve op={op} />
            : <MoveLine op={op} />
          }
        </Ul>
      </Details>
    )
  }
  </Li>
)

const XrayPathOps = ({ ops=false }) => {
  if (!ops || ops.length < 1) return null

  return (
    <Li>
      <Details>
        <Summary>
          <SumDiv>
            <Deg />
            <span className="font-bold">path.ops</span>
          </SumDiv>
          <Chevron />
        </Summary>
        <Ul>
          {ops.map(op => <XrayPathOp op={op} />)}
        </Ul>
      </Details>
    </Li>
  )
}

export default XrayPathOps
