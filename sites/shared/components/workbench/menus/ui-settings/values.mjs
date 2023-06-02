import { Difficulty } from 'shared/components/designs/difficulty.mjs'
import { ListValue } from '../shared/values.mjs'

export const values = {
  renderer: ListValue,
  inspect: ListValue,
  control: ({ control }) => <Difficulty score={control} color="primary" />,
}
