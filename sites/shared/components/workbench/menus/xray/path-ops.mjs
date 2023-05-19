//import { Chevron } from 'shared/components/navigation/primary'
//import { XrayPoint } from './point'
//
//const MoveLine = ({ op }) => <XrayPoint point={op.to} />
const Curve = ({ op }) => null
/*
  ['cp1', 'cp2', 'to'].map((pnt) => (
    <Li key={pnt}>
      <Details>
        <Summary>
          <SumDiv>
            <Deg />
            <span className="font-bold">{pnt}</span>
          </SumDiv>
          <Chevron />
        </Summary>
        <XrayPoint point={op[pnt]} />
      </Details>
    </Li>
  ))
*/
const XrayPathOp = ({ op }) => null
/*
 * (
  <Li>
    {op.type === 'close' ? (
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
        <Ul>{op.type === 'curve' ? <Curve op={op} /> : <MoveLine op={op} />}</Ul>
      </Details>
    )}
  </Li>
)
*/
export const XrayPathOps = ({ ops = false }) => null
/*
 * {
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
          {ops.map((op) => (
            <XrayPathOp op={op} key={op} />
          ))}
        </Ul>
      </Details>
    </Li>
  )
}
*/
