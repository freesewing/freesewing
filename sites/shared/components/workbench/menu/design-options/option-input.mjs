import { DesignOptionPctDeg } from 'shared/components/workbench/inputs/design-option-pct-deg.mjs'
import { CountOption } from 'shared/components/workbench/inputs/design-option-count.mjs'
import { ListOption } from 'shared/components/workbench/inputs/design-option-list.mjs'
import { Popout } from 'shared/components/popout.mjs'

export const Tmp = () => <p>not yet</p>

export const inputs = {
  Pct: DesignOptionPctDeg,
  Count: CountOption,
  Deg: (props) => <DesignOptionPctDeg {...props} type="deg" />,
  List: ListOption,
  Mm: () => (
    <Popout fixme compact>
      Mm options are deprecated. Please report this
    </Popout>
  ),
  Constant: Tmp,
}
