//import { Chevron } from 'shared/components/navigation/primary.mjs'
//import { ClearIcon, FilterIcon, SearchIcon } from 'shared/components/icons.mjs'
//import { XrayPath } from './path.mjs'
//import { XrayPoint } from './point.mjs'
//import { useTranslation } from 'next-i18next'

//const types = {
//  paths: XrayPath,
//  points: XrayPoint,
//}

export const XrayList = (props) => {
  //const { t } = useTranslation(['app', 'parts'])
  return null
  // FIXME
  /*

  const title = t(`parts:${props.partName}`) + ` (${props.partName})`

  const part = props.gist._state.xray.parts[props.partName]

  // Is this the only part on display?
  const only =
    props.gist.only && props.gist.only.length === 1 && props.gist.only[0] === props.partName

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
            className={`px-3 hover:text-secondary-focus ${only ? 'text-accent' : 'text-secondary'}`}
            title={t('filter')}
            onClick={
              only
                ? () => props.unsetGist(['only'])
                : () => props.updateGist(['only'], [props.partName])
            }
          >
            <FilterIcon />
          </button>
          <button
            className="text-accent px-3 hover:text-secondary-focus"
            onClick={() => props.unsetGist(['_state', 'xray', 'parts', props.partName])}
          >
            <ClearIcon />
          </button>
          <Chevron w={6} m={3} />
        </Summary>
        {Object.keys(types).map(
          (type) =>
            part[type] && (
              <Ul key={type}>
                <Li>
                  <Details>
                    <Summary>
                      <SumDiv>
                        <span className="capitalize">{type}</span>
                      </SumDiv>
                      <button
                        className="text-accent px-3 hover:text-secondary-focus"
                        onClick={() =>
                          props.unsetGist(['_state', 'xray', 'parts', props.partName, type])
                        }
                      >
                        <ClearIcon />
                      </button>
                      <Chevron />
                    </Summary>
                    <Ul>
                      {Object.keys(part[type]).map((id) => (
                        <Li key={id}>
                          <Details>
                            <Summary>
                              <SumDiv>
                                <Deg />
                                <span>{id}</span>
                              </SumDiv>
                              <button
                                className={`px-3 hover:text-secondary-focus"
                                ${
                                  props.gist._state?.xray?.reveal?.[props.partName]?.[type]?.[id]
                                    ? 'text-accent'
                                    : 'text-secondary'
                                }`}
                                onClick={
                                  props.gist._state?.xray?.reveal?.[props.partName]?.[type]?.[id]
                                    ? () =>
                                        props.unsetGist([
                                          '_state',
                                          'xray',
                                          'reveal',
                                          props.partName,
                                          type,
                                          id,
                                        ])
                                    : () =>
                                        props.updateGist(
                                          ['_state', 'xray', 'reveal', props.partName, type, id],
                                          id
                                        )
                                }
                              >
                                <SearchIcon />
                              </button>
                              <button
                                className="text-accent px-3 hover:text-secondary-focus"
                                onClick={() => {
                                  props.unsetGist([
                                    '_state',
                                    'xray',
                                    'parts',
                                    props.partName,
                                    type,
                                    id,
                                  ])
                                  props.unsetGist([
                                    '_state',
                                    'xray',
                                    'reveal',
                                    props.partName,
                                    type,
                                    id,
                                  ])
                                }}
                              >
                                <ClearIcon />
                              </button>
                              <Chevron />
                            </Summary>
                            {type === 'paths' && (
                              <XrayPath
                                pathName={id}
                                partName={props.partName}
                                draft={props.draft}
                                t={t}
                                units={props.gist.units}
                              />
                            )}
                            {type === 'points' && (
                              <XrayPoint
                                pointName={id}
                                partName={props.partName}
                                draft={props.draft}
                                t={t}
                              />
                            )}
                          </Details>
                        </Li>
                      ))}
                    </Ul>
                  </Details>
                </Li>
              </Ul>
            )
        )}
      </Details>
    </Li>
  )
  */
}
