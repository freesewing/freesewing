import { Chevron } from 'shared/components/navigation/primary.mjs'
import {
  Ul,
  Li,
  Details,
  Summary,
  SumButton,
  SumDiv,
  Deg,
} from 'shared/components/workbench/menus/index.mjs'

export const ConsoleLog = (props) => (
  <Li>
    <Details>
      <Summary>
        <SumDiv>
          <Deg />
          <span>console.log()</span>
        </SumDiv>
        <Chevron />
      </Summary>
      <Ul>
        {['designConfig', 'patternConfig', 'gist', 'draft', 'renderProps'].map((it) => (
          <Li key={it}>
            <SumButton
              onClick={() => {
                if (it === 'designConfig') return console.log(props.design.designConfig)
                if (it === 'patternConfig') return console.log(props.design.patternConfig)
                if (it === 'renderProps') return console.log(props.draft.getRenderProps())
                return console.log(props[it])
              }}
            >
              <SumDiv>
                <Deg />
                <span>{it}</span>
              </SumDiv>
            </SumButton>
          </Li>
        ))}
      </Ul>
    </Details>
  </Li>
)
