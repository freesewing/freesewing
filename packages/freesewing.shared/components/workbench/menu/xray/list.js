import { Chevron } from 'shared/components/navigation/primary.js'
import ClearIcon from 'shared/components/icons/clear.js'
import { Ul, Li, Details, Summary, SumDiv, Deg } from 'shared/components/workbench/menu'


const Path = props => <p>{props.pathName}</p>

const XrayList = props => {

  let title = props.app.t(`parts.${props.partName}`)
  if (title !== props.partName || true) title + ` (${props.partName})`

  return (
    <Li>
      <Details>
        <Summary>
          <SumDiv>
            <Deg />
            <span>{title}</span>
            <span className="ml-2 opacity-60">[{props.partName}]</span>
          </SumDiv>
          <button
            className="text-accent px-3 hover:text-secondary-focus"
            onClick={() => props.unsetGist(['xray', 'parts', props.partName])}
          >
            <ClearIcon />
          </button>
          <Chevron w={6} m={3}/>
        </Summary>
        {props.gist.xray.parts[props.partName].paths && (
          <Ul>
            <Li>
              <Details>
                <Summary>
                  <SumDiv>
                    <span>Paths</span>
                  </SumDiv>
                </Summary>
                {Object.keys(props.gist.xray.parts[props.partName].paths)
                  .map(pathName => <Path {...props} pathName={pathName} />)
                }
              </Details>
            </Li>
          </Ul>
        )}
      </Details>
    </Li>
  )
}

export default XrayList
