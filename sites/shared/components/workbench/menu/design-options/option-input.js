import PctDegOption from 'shared/components/workbench/inputs/design-option-pct-deg'
import CountOption from 'shared/components/workbench/inputs/design-option-count'
import ListOption from 'shared/components/workbench/inputs/design-option-list'
import Popout from 'shared/components/popout'

export const Tmp = props => <p>not yet</p>

export const inputs = {
  pct: PctDegOption,
  count: CountOption,
  deg: props => (<PctDegOption {...props} type='deg' />),
  list: ListOption,
  mm: () => <Popout fixme compact>Mm options are deprecated. Please report this</Popout>,
  constant: Tmp,
}
