import { base } from '@freesewing/brian'

export const front = {
  from: base,
  name: '{{ name }}.front',
  measurements: [],
  options: {},
  draft: ({ part }) => {
    return part
  },
}
