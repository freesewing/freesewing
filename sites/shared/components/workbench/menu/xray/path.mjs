import { Ul, Li, NoSumDiv, Deg } from 'shared/components/workbench/menu/index.mjs'
import { formatMm } from 'shared/utils.mjs'
import { XrayAttributes } from './attributes.mjs'
import { XrayPathOps } from './path-ops.mjs'

export const XrayPath = ({ pathName, partName, draft, units }) => {
  const path = draft?.parts?.[partName]?.paths?.[pathName]

  if (!path) return null
  return (
    <Ul>
      <XrayAttributes attr={path.attributes} />
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
      <XrayPathOps ops={path.ops} />
    </Ul>
  )
}
