import { pluginBundle } from '@freesewing/plugin-bundle'

// This tutorial design is kinda weird, so we've
// setup this part to hold options & measurements config
export const configpart = {
  name: 'tutorial.configpart',
  measurements: ['head'],
  plugins: [pluginBundle],
  options: {
    size: { pct: 50, min: 10, max: 100 },
    neckRatio: { pct: 80, min: 70, max: 90 },
    widthRatio: { pct: 45, min: 35, max: 55 },
    lengthRatio: { pct: 75, min: 55, max: 85 },
  },
  hide: { self: true },
  draft: ({ part }) => part,
}
