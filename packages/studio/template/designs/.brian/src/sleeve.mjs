import { sleeve } from '@freesewing/brian'

export const front = {
  from: sleeve,
  name: '{{ name }}.sleeve',
  measurements: [],
  options: {},
  draft: ({ part }) => {
    return part
  },
}
