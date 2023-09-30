import { measurementsPlugin } from '@freesewing/plugin-measurements'

const measies = [
  'seatFront',
  'seatBackArc',
  'seatFrontArc',
  'waistFront',
  'waistBackArc',
  'waistFrontArc',
  'crossSeamFront',
  'crossSeamBack',
]

const pluginMeasurements = ({ points, Point, measurements, options, part, macro, store }) => {
  if (['measurements', 'all'].indexOf(options.plugin) !== -1) {
    let y = 10
    for (const m of measies) {
      points[m] = new Point(0, y).attr('data-text', [m, measurements[m]])
      y += 10
    }

    macro('bannerbox', {
      topLeft: new Point(5, 10),
      bottomRight: new Point(55, 75),
      text: 'plugin = measurements',
      ...store.get('bannerbox.plugin'),
    })
  }

  return part
}

export const measurements = {
  name: 'plugintest.measurements',
  measurements: ['seat', 'seatBack', 'waist', 'waistBack', 'crossSeam', 'crossSeamFront'],
  plugins: measurementsPlugin,
  draft: pluginMeasurements,
}
