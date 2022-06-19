import { Chevron } from 'shared/components/navigation/primary.js'
import { Ul, Li, Details, Summary, SumButton, SumDiv, Deg } from 'shared/components/workbench/menu'

const ConsoleLog = props =>  (
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
        {['config', 'gist', 'draft'].map(it => (
          <Li key={it}>
            <SumButton onClick={() => console.log(it === 'config'
              ? props.design.config
              : props[it]
            )}>
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

export default ConsoleLog
