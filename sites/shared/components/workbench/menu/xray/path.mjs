import { Ul, Li, NoSumDiv, Deg } from 'shared/components/workbench/menu/index.mjs'
import { formatMm } from 'shared/utils.mjs'
import Attributes from './attributes.mjs'
import Ops from './path-ops.mjs'

export const XrayPath = ({ pathName, partName, draft, units }) => {
  const path = draft?.parts?.[partName]?.paths?.[pathName]

  if (!path) return null
  return (
    <Ul>
      <Attributes attr={path.attributes} />
      <Li>
        <NoSumDiv>
          <Deg />
          <span className="font-bold mr-2">path.render =</span>
          <span>{JSON.stringify(path.render)}</span>
        </NoSumDiv>
      </Li>
      <Li>
        <NoSumDiv>
          <Deg />
          <span className="font-bold mr-2">path.length() =</span>
          <span
            dangerouslySetInnerHTML={{
              __html: formatMm(path.length(), units),
            }}
          />
        </NoSumDiv>
      </Li>
      <Ops ops={path.ops} />
    </Ul>
  )
}
