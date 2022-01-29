import { Chevron } from 'shared/components/navigation/primary.js'
import { Ul, Li, Details, Summary, SumDiv, NoSumDiv, Deg } from 'shared/components/workbench/menu'
import { round } from 'shared/utils.js'

const XrayAttributes = ({ attr=false }) => {
  if (!attr || !attr.list || Object.keys(attr.list).length < 1) return null

  return (
    <Li>
      <Details>
        <Summary>
          <SumDiv>
            <Deg />
            Attributes
          </SumDiv>
          <Chevron />
        </Summary>
        <Ul>
          {Object.keys(attr.list).map(at => (
          <Li>
            <Details>
              <Summary>
                <SumDiv>
                  <Deg />
                  {at}
                </SumDiv>
                <Chevron />
              </Summary>
              <Ul>
                {attr.list[at].map(val => (
                  <Li key={val}>
                    <NoSumDiv>
                      <Deg />
                      <span>{val}</span>
                    </NoSumDiv>
                  </Li>
                ))}
              </Ul>
            </Details>
          </Li>
          ))}
        </Ul>
      </Details>
    </Li>
  )
}

export default XrayAttributes
