// Not importing i18n since it's a run-time plugin loaded by workbench
//import { i18nPlugin } from '@freesewing/plugin-i18n'

const pluginI18n = ({ points, Point, paths, Path, options, part }) => {
  if (['i18n', 'all'].indexOf(options.plugin) !== -1) {
    points.a = new Point(0, 0).attr('data-text', 'cutTwoStripsToFinishTheArmholes')

    // Prevent clipping of text
    paths.box = new Path().move(new Point(0, -10)).line(new Point(130, 0)).attr('class', 'hidden')
  }

  return part
}

export const i18n = {
  name: 'plugintest.i18n',
  //plugins: i18nPlugin,
  draft: pluginI18n,
}
