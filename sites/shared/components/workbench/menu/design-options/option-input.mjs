import { PctDegOption } from 'shared/components/workbench/inputs/design-option-pct-deg.mjs'
import { CountOption } from 'shared/components/workbench/inputs/design-option-count.mjs'
import { ListOption } from 'shared/components/workbench/inputs/design-option-list.mjs'
import { Popout } from 'shared/components/popout.mjs'

export const Tmp = (props) => <p>not yet</p>

export const inputs = {
  pct: PctDegOption,
  count: CountOption,
  deg: (props) => <PctDegOption {...props} type="deg" />,
  list: ListOption,
  mm: () => (
    <Popout fixme compact>
      Mm options are deprecated. Please report this
    </Popout>
  ),
  constant: Tmp,
}
