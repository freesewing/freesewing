import { version, name } from '../package.json'
import validate from './validate'

export default {
  name: name,
  version: version,
  hooks: {
    preDraft: function (pattern) {
      if (typeof pattern.settings.measurements === 'undefined')
        return pattern.debug({
          type: 'error',
          label: '👕 No measurements provided',
          msg:
            'You did not provide any measurements. Most, if not all, patterns require measurements, so this is most likely an issue.'
        })
      for (let measurement of pattern.config.measurements) {
        if (!pattern.settings.measurements[measurement]) {
          pattern.debug({
            type: 'error',
            label: '👕 Missing measurement:',
            msg: measurement
          })
          pattern.debug({
            type: 'info',
            label: '👕 All measurements:',
            msg: pattern.settings.measurements
          })
          throw new Error(`Missing measurement: ${measurement}`)
        } else {
          pattern.debug({
            type: 'success',
            label: '👕 ' + measurement + ' is ok',
            msg: pattern.settings.measurements[measurement]
          })
        }
      }
    },
    postDraft: function (pattern) {
      for (let partId in pattern.parts) {
        let part = pattern.parts[partId]
        let { debug } = part.shorthand()
        for (let pointId in part.points) {
          validate.point(part.points[pointId], partId, pointId, debug)
          validate.text('point', part.points[pointId], partId, pointId, debug)
        }
        for (let pathId in part.paths) {
          validate.path(part.paths[pathId], partId, pathId, debug)
          validate.text('path', part.paths[pathId], partId, pathId, debug)
        }
        for (let snippetId in part.snippets) {
          if (!validate.snippet(part.snippets[snippetId], partId, snippetId, debug)) {
            throw new Error(
              `pattern.parts.${partId}.snippets.${snippetId} is not a valid Snippet object`
            )
          }
        }
      }
    }
  }
}
