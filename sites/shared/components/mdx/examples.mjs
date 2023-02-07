import { Examples as Pattern } from '@freesewing/examples'
import { Svg } from '../workbench/draft/svg'
import { Defs } from '../workbench/draft/defs'
import { Stack } from '../workbench/draft/stack'
import { useGist } from 'shared/hooks/useGist'
import Md from 'react-markdown'

export const Examples = ({ app, part, caption, xray }) => {
  // State for gist
  const { gist, unsetGist, updateGist } = useGist('examples-mdx', app)

  if (xray) {
    gist._state.xray = { enabled: true }
    gist.margin = 20
  }

  //const measurements = part.includes('tutorial') ? measurementSets.tutorial : {}
  const pattern = Pattern
  const draft = new pattern({
    only: [`examples.${part}`],
    measurements: {},
  })
  const patternProps = draft.draft().getRenderProps()
  console.log(patternProps)
  if (draft.store.logs.error.length > 0 || draft.setStores[0].logs.error.length > 0)
    return (
      <div className="max-w-full p-4">
        <pre>{draft.store.logs.error.join('\n')}</pre>
        <pre>{draft.setStores[0].logs.error.join('\n')}</pre>
      </div>
    )

  return (
    <div className="my-8">
      <Svg {...patternProps} embed={true}>
        <Defs {...patternProps} />
        <style>{`:root { --pattern-scale: 1} ${patternProps.svg.style}`}</style>
        <g>
          {Object.keys(patternProps.stacks).map((stackName) => (
            <Stack
              {...{ app, gist, updateGist, unsetGist, patternProps }}
              showInfo={app.setPopup}
              key={stackName}
              stackName={stackName}
              stack={patternProps.stacks[stackName]}
            />
          ))}
        </g>
      </Svg>
      {caption && (
        <div className="text-center italic -mt-4">
          <Md>{caption}</Md>
        </div>
      )}
    </div>
  )
}
