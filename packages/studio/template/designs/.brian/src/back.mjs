import { front } from './front.mjs'

export const back = {
  from: front,
  name: '{{ name }}.back',
  options: {},
  draft: ({ part }) => {
    return part
  },
}
