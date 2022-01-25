import Attributes from './attributes'
import { round } from './utils'
import pkg from '../package.json'

function Svg(pattern) {
  this.openGroups = []
  this.layout = {}
  this.freeId = 0
  this.body = ''
  /*
   * This breaks SVG style (see #1606)
   * Can we not set variables in SVG style?
   * this.style = `svg.freesewing.pattern { --pattern-scale: ${pattern.settings.scale} }`
   */
  this.style = ''
  this.script = ''
  this.defs = ''
  this.pattern = pattern // Needed to expose pattern to hooks
  this.prefix = '<?xml version="1.0" encoding="UTF-8" standalone="no"?>'
  this.attributes = new Attributes()
  this.attributes.add('xmlns', 'http://www.w3.org/2000/svg')
  this.attributes.add('xmlns:svg', 'http://www.w3.org/2000/svg')
  this.attributes.add('xmlns:xlink', 'http://www.w3.org/1999/xlink')
  this.attributes.add('xml:lang', pattern.settings.locale)
  this.attributes.add('xmlns:freesewing', 'http://freesewing.org/namespaces/freesewing')
  this.attributes.add('freesewing', pkg.version)
}

Svg.prototype.runHooks = function (hookName, data = false) {
  if (data === false) data = this
  let hooks = this.hooks[hookName]
  if (hooks.length > 0) {
    for (let hook of hooks) {
      hook.method(data, hook.data)
    }
  }
}

/** Runs insertText hooks */
Svg.prototype.insertText = function (text) {
  if (this.hooks.insertText.length > 0) {
    for (let hook of this.hooks.insertText)
      text = hook.method(this.pattern.settings.locale, text, hook.data)
  }

  return text
}

/** Renders a draft object as SVG */
Svg.prototype.render = function (pattern) {
  this.idPrefix = pattern.settings.idPrefix
  this.runHooks('preRender')
  if (!pattern.settings.embed) {
    this.attributes.add('width', round(pattern.width) + 'mm')
    this.attributes.add('height', round(pattern.height) + 'mm')
  }
  this.attributes.add('viewBox', `0 0 ${pattern.width} ${pattern.height}`)
  this.head = this.renderHead()
  this.tail = this.renderTail()
  this.svg = ''
  this.layout = {} // Reset layout
  for (let partId in pattern.parts) {
    let part = pattern.parts[partId]
    if (part.render) {
      let partSvg = this.renderPart(part)
      this.layout[partId] = {
        svg: partSvg,
        transform: part.attributes.getAsArray('transform'),
      }
      this.svg += this.openGroup(`${this.idPrefix}part-${partId}`, part.attributes)
      this.svg += partSvg
      this.svg += this.closeGroup()
    }
  }
  this.svg = this.prefix + this.renderSvgTag() + this.head + this.svg + this.tail
  this.runHooks('postRender')

  return this.svg
}

/** Renders SVG head section */
Svg.prototype.renderHead = function () {
  let svg = this.renderStyle()
  svg += this.renderScript()
  svg += this.renderDefs()
  svg += this.openGroup(this.idPrefix + 'container')

  return svg
}

/** Renders SVG closing section */
Svg.prototype.renderTail = function () {
  let svg = ''
  svg += this.closeGroup()
  svg += this.nl() + '</svg>'

  return svg
}

/** Returns SVG code for the opening SVG tag */
Svg.prototype.renderSvgTag = function () {
  let svg = '<svg'
  this.indent()
  svg += this.nl() + this.attributes.render()
  this.outdent()
  svg += this.nl() + '>' + this.nl()

  return svg
}

/** Returns SVG code for the style block */
Svg.prototype.renderStyle = function () {
  let svg = '<style type="text/css"> <![CDATA[ '
  this.indent()
  svg += this.nl() + this.style
  this.outdent()
  svg += this.nl() + ']]>' + this.nl() + '</style>' + this.nl()
  return svg
}

/** Returns SVG code for the script block */
Svg.prototype.renderScript = function () {
  let svg = '<script type="text/javascript"> <![CDATA['
  this.indent()
  svg += this.nl() + this.script
  this.outdent()
  svg += this.nl() + ']]>' + this.nl() + '</script>' + this.nl()

  return svg
}

/** Returns SVG code for the defs block */
Svg.prototype.renderDefs = function () {
  let svg = '<defs>'
  this.indent()
  svg += this.nl() + this.defs
  this.outdent()
  svg += this.nl() + '</defs>' + this.nl()

  return svg
}

/** Returns SVG code for a Part object */
Svg.prototype.renderPart = function (part) {
  let svg = ''
  for (let key in part.paths) {
    let path = part.paths[key]
    if (path.render) svg += this.renderPath(path)
  }
  for (let key in part.points) {
    if (part.points[key].attributes.get('data-text')) {
      svg += this.renderText(part.points[key])
    }
    if (part.points[key].attributes.get('data-circle')) {
      svg += this.renderCircle(part.points[key])
    }
  }
  for (let key in part.snippets) {
    let snippet = part.snippets[key]
    svg += this.renderSnippet(snippet, part)
  }

  return svg
}

/** Returns SVG code for a Path object */
Svg.prototype.renderPath = function (path) {
  if (!path.attributes.get('id')) path.attributes.add('id', this.idPrefix + this.getId())
  path.attributes.set('d', path.asPathstring())

  return `${this.nl()}<path ${path.attributes.render()} />${this.renderPathText(path)}`
}

Svg.prototype.renderPathText = function (path) {
  let text = path.attributes.get('data-text')
  if (!text) return ''
  else this.text = this.insertText(text)
  let attributes = path.attributes.renderIfPrefixIs('data-text-')
  // Sadly aligning text along a patch can't be done in CSS only
  let offset = ''
  let align = path.attributes.get('data-text-class')
  if (align && align.indexOf('center') > -1) offset = ' startOffset="50%" '
  else if (align && align.indexOf('right') > -1) offset = ' startOffset="100%" '
  let svg = this.nl() + '<text>'
  this.indent()
  svg += `<textPath xlink:href="#${path.attributes.get(
    'id'
  )}" ${offset}><tspan ${attributes}>${this.escapeText(this.text)}</tspan></textPath>`
  this.outdent()
  svg += this.nl() + '</text>'

  return svg
}

Svg.prototype.renderText = function (point) {
  let text = point.attributes.getAsArray('data-text')
  if (text !== false) {
    let joint = ''
    for (let string of text) {
      this.text = this.insertText(string)
      joint += this.text + ' '
    }
    this.text = this.insertText(joint)
  }
  point.attributes.set('data-text-x', round(point.x))
  point.attributes.set('data-text-y', round(point.y))
  let lineHeight =
    point.attributes.get('data-text-lineheight') || 6 * (this.pattern.settings.scale || 1)
  point.attributes.remove('data-text-lineheight')
  let svg = `${this.nl()}<text ${point.attributes.renderIfPrefixIs('data-text-')}>`
  this.indent()
  // Multi-line text?
  if (this.text.indexOf('\n') !== -1) {
    let lines = this.text.split('\n')
    svg += `<tspan>${lines.shift()}</tspan>`
    for (let line of lines) {
      svg += `<tspan x="${round(point.x)}" dy="${lineHeight}">${line}</tspan>`
    }
  } else {
    svg += `<tspan>${this.escapeText(this.text)}</tspan>`
  }
  this.outdent()
  svg += this.nl() + '</text>'

  return svg
}

Svg.prototype.escapeText = function (text) {
  return text.replace('"', '&#8220;')
}

Svg.prototype.renderCircle = function (point) {
  return `<circle cx="${round(point.x)}" cy="${round(point.y)}" r="${point.attributes.get(
    'data-circle'
  )}" ${point.attributes.renderIfPrefixIs('data-circle-')}></circle>`
}

/** Returns SVG code for a snippet */
Svg.prototype.renderSnippet = function (snippet, part) {
  let x = round(snippet.anchor.x)
  let y = round(snippet.anchor.y)
  let scale = snippet.attributes.get('data-scale') || 1
  scale = scale * (this.pattern.settings.scale || 1)
  if (scale) {
    snippet.attributes.add('transform', `translate(${x}, ${y})`)
    snippet.attributes.add('transform', `scale(${scale})`)
    snippet.attributes.add('transform', `translate(${x * -1}, ${y * -1})`)
  }
  let rotate = snippet.attributes.get('data-rotate')
  if (rotate) {
    snippet.attributes.add('transform', `rotate(${rotate}, ${x}, ${y})`)
  }
  let svg = this.nl()
  svg += `<use x="${x}" y="${y}" `
  svg += `xlink:href="#${snippet.def}" ${snippet.attributes.render()}>`
  svg += '</use>'

  return svg
}

/** Returns SVG code to open a group */
Svg.prototype.openGroup = function (id, attributes = false) {
  let svg = this.nl() + this.nl()
  svg += `<!-- Start of group #${id} -->`
  svg += this.nl()
  svg += `<g id="${id}"`
  if (attributes) svg += ` ${attributes.render()}`
  svg += '>'
  this.indent()
  this.openGroups.push(id)

  return svg
}

/** Returns SVG code to close a group */
Svg.prototype.closeGroup = function () {
  this.outdent()

  return `${this.nl()}</g>${this.nl()}<!-- end of group #${this.openGroups.pop()} -->`
}

/** Returns a linebreak + identation */
Svg.prototype.nl = function () {
  return '\n' + this.tab()
}

/** Returns indentation */
Svg.prototype.tab = function () {
  let space = ''
  for (let i = 0; i < this.tabs; i++) {
    space += '  '
  }

  return space
}

/** Increases indentation by 1 */
Svg.prototype.indent = function () {
  this.tabs += 1
}

/** Decreases indentation by 1 */
Svg.prototype.outdent = function () {
  this.tabs -= 1
}

/** Returns an unused ID */
Svg.prototype.getId = function () {
  this.freeId += 1

  return '' + this.freeId
}

export default Svg
