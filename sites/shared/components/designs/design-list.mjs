import { designList, designs } from 'shared/config/designs.mjs'
import { Design, ns as designNs } from 'shared/components/designs/design.mjs'

export const ns = designNs

export const DesignList = ({ tag = false }) => {
  let list = designList
  if (tag) list = designList.filter((d) => designs[d].tags.includes(tag))

  return (
    <div className="flex flex-row flex-wrap gap-2">
      {list.map((name) => (
        <Design name={name} key={name} />
      ))}
    </div>
  )
}
