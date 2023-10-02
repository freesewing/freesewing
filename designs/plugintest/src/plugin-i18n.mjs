// Not importing i18n since it's a run-time plugin loaded by workbench
//import { i18nPlugin } from '@freesewing/plugin-i18n'

const pluginI18n = ({ points, Point, options, part, macro, store }) => {
  if (['i18n', 'all'].indexOf(options.plugin) !== -1) {
    points.a = new Point(0, 0).attr('data-text', 'cutTwoStripsToFinishTheArmholes')

    macro('bannerbox', {
      topLeft: new Point(0, 0),
      bottomRight: new Point(105, 0),
      text: 'plugin = i18n',
      ...store.get('bannerbox.plugin'),
    })
  }

  return part
}

export const i18n = {
  name: 'plugintest.i18n',
  //plugins: i18nPlugin,
  draft: pluginI18n,
}
