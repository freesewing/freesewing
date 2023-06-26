import { formatMm } from 'shared/utils.mjs'
import { mergeOptions } from '@freesewing/core'
import {
  BoolInput,
  ConstantInput,
  SliderInput,
  DegInput,
  ListInput,
  PctInput,
} from '../shared/inputs.mjs'

const PctOptionInput = (props) => {
  const { config, settings, changed } = props
  const currentOrDefault = changed ? props.current : config.dflt / 100
  return (
    <PctInput {...props}>
      <div className="flex flex-row justify-around">
        <span className={changed ? 'text-accent' : 'text-secondary'}>
          {config.toAbs && settings.measurements
            ? formatMm(
                config.toAbs(
                  currentOrDefault,
                  settings,
                  mergeOptions(settings, props.patternConfig.options)
                )
              )
            : ' '}
        </span>
      </div>
    </PctInput>
  )
}

// Facilitate lookup of the input component
export const inputs = {
  bool: BoolInput,
  constant: ConstantInput,
  count: SliderInput,
  deg: DegInput,
  list: ListInput,
  mm: () => <span>FIXME: Mm options are deprecated. Please report this </span>,
  pct: PctOptionInput,
}
