/*
 * This defines the FreeSewing web of trust
 * See: https://FreeSewing.dev/reference/trust
 */
export const trustees = {
  1: {
    x: 1306,
    y: 319,
    title: 'joost',
    in: 'Antwerp',
  },
  132: {
    x: 457,
    y: 345,
    title: 'woutervdub',
    in: 'Seattle',
  },
  13050: {
    x: 668,
    y: 399,
    title: 'karen',
    in: 'Chicago',
  },
}

/*
 * These are the connections between the trustees
 * See: https://FreeSewing.dev/reference/trust
 */
export const connections = [
  [1, 132],
  [1, 13050],
]

export const lastUpdate = '20240402'
