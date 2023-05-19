import { Chevron } from 'shared/components/navigation/primary'
import {
  Ul,
  Li,
  Details,
  Summary,
  SumDiv,
  NoSumDiv,
  Deg,
} from 'shared/components/workbench/menus/index.mjs'

export const XrayAttributes = ({ attr = false, t }) => {
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
          {Object.keys(attr.list).map((at) => (
            <Li key={at}>
              <Details>
                <Summary>
                  <SumDiv>
                    <Deg />
                    {at}
                  </SumDiv>
                  <Chevron />
                </Summary>
                <Ul>
                  {attr.list[at].map((val) => (
                    <Li key={val}>
                      <NoSumDiv>
                        <Deg />
                        <span>{val === true ? t('app.yes') : val}</span>
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
