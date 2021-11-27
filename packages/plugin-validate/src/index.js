import { version, name } from '../package.json'
import validate from './validate'

export default {
  name: name,
  version: version,
  hooks: {
    preRender: (svg) => {
      if (svg.attributes.get('freesewing:plugin-validate') === false) {
        svg.attributes.set('freesewing:plugin-validate', version)
      }
    },
    preDraft: function (pattern) {
      if (typeof pattern.settings.measurements === 'undefined')
        return pattern.raise.error(
          '👕 No measurements provided: You did not provide any measurements. Most, if not all, patterns require measurements, so this is most likely an issue.'
        )
      for (let measurement of pattern.config.measurements) {
        if (!pattern.settings.measurements[measurement]) {
          pattern.raise.error('👕 Missing measurement:' + measurement)
          pattern.raise.info('👕 All measurements:' + pattern.settings.measurements)
          throw new Error(`Missing measurement: ${measurement}`)
        } else {
          pattern.raise.debug(
            '👕 ' + measurement + ' is ok' + pattern.settings.measurements[measurement]
          )
        }
      }
    },
    postDraft: function (pattern) {
      for (let partId in pattern.parts) {
        let part = pattern.parts[partId]
        let { raise } = part.shorthand()
        for (let pointId in part.points) {
          validate.point(part.points[pointId], partId, pointId, raise)
          validate.text('point', part.points[pointId], partId, pointId, raise)
        }
        for (let pathId in part.paths) {
          validate.path(part.paths[pathId], partId, pathId, raise)
          validate.text('path', part.paths[pathId], partId, pathId, raise)
        }
        for (let snippetId in part.snippets) {
          if (!validate.snippet(part.snippets[snippetId], partId, snippetId, raise)) {
            throw new Error(
              `pattern.parts.${partId}.snippets.${snippetId} is not a valid Snippet object`
            )
          }
        }
      }
    },
  },
}
