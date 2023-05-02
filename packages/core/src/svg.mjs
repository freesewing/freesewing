import { Attributes } from './attributes.mjs'
import { Defs } from './defs.mjs'
import { __addNonEnumProp, round } from './utils.mjs'
import { version } from '../data.mjs'

//////////////////////////////////////////////
//               CONSTRUCTOR                //
//////////////////////////////////////////////

/**
 * Constructor for an Svg
 *
 * @constructor
 * @param {Patern} pattern - The Pattern object to render
 * @return {Svg} this - The Path instance
 */
export function Svg(pattern) {
  // Non-enumerable properties
  __addNonEnumProp(this, 'openGroups', [])
  __addNonEnumProp(this, 'freeId', 0)
  __addNonEnumProp(this, 'prefix', '<?xml version="1.0" encoding="UTF-8" standalone="no"?>')

  // Enumerable properties
  this.pattern = pattern // Needed to expose pattern to hooks
  this.attributes = new Attributes()
  this.attributes.add('xmlns', 'http://www.w3.org/2000/svg')
  this.attributes.add('xmlns:svg', 'http://www.w3.org/2000/svg')
  this.attributes.add('xmlns:xlink', 'http://www.w3.org/1999/xlink')
  this.attributes.add('xml:lang', pattern?.settings?.[0]?.locale || 'en')
  this.attributes.add('xmlns:freesewing', 'http://freesewing.org/namespaces/freesewing')
  this.attributes.add('freesewing', version)
  this.layout = {}
  this.body = ''
  this.style = ''
  this.defs = new Defs()
}

//////////////////////////////////////////////
//            PUBLIC METHODS                //
//////////////////////////////////////////////

/**
 * Renders a drafted Pattern as SVG
 *
 * @param {Pattern} pattern - The pattern to render
 * @return {string} svg - The rendered SVG output
 */
Svg.prototype.render = function () {
  this.idPrefix = this.pattern?.settings?.[0]?.idPrefix || 'fs-'
  this.__runHooks('preRender')
  if (!this.pattern.settings[0].embed) {
    this.attributes.add('width', round(this.pattern.width) + 'mm')
    this.attributes.add('height', round(this.pattern.height) + 'mm')
  }
  this.attributes.add('viewBox', `0 0 ${round(this.pattern.width)} ${round(this.pattern.height)}`)
  this.head = this.__renderHead()
  this.tail = this.__renderTail()
  this.svg = ''
  this.layout = {} // Reset layout
  this.activeStackIndex = 0
  for (let stackId in this.pattern.stacks) {
    this.activeStack = stackId
    this.idPrefix = this.pattern.settings[this.activeStackIndex]?.idPrefix || 'fs-'
    const stack = this.pattern.stacks[stackId]
    if (!this.pattern.__isStackHidden(stackId)) {
      const stackSvg = this.__renderStack(stack)
      this.layout[stackId] = {
        svg: stackSvg,
        transform: stack.attributes.getAsArray('transform'),
      }
      this.svg += this.__openGroup(`${this.idPrefix}stack-${stackId}`, stack.attributes)
      this.svg += stackSvg
      this.svg += this.__closeGroup()
    }
    this.activeStackIndex++
  }
  this.svg = this.prefix + this.__renderSvgTag() + this.head + this.svg + this.tail
  this.__runHooks('postRender')

  return this.svg
}

//////////////////////////////////////////////
//            PRIVATE METHODS               //
//////////////////////////////////////////////

/**
 * Returns SVG markup to close a group
 *
 * @private
 * @return {string} svg - The SVG markup to open a group
 */
Svg.prototype.__closeGroup = function () {
  this.__outdent()

  return `${this.__nl()}</g>${this.__nl()}<!-- end of group #${this.openGroups.pop()} -->`
}

/**
 * Escapes text for SVG output
 *
 * @private
 * @param {string} text - The text to escape
 * @return {string} escaped - The escaped text
 */
Svg.prototype.__escapeText = function (text) {
  return text.replace(/"/g, '&#8220;')
}

/**
 * Returs an unused ID
 *
 * @private
 * @return {numer} id - The next free ID
 */
Svg.prototype.__getId = function () {
  this.freeId += 1

  return '' + this.freeId
}

/**
 * Increases indentation by 1
 *
 * @private
 * @return {Svg} this - The Svg instance
 */
Svg.prototype.__indent = function () {
  this.tabs += 1

  return this
}

/**
 * Runs the insertText lifecycle hook(s)
 *
 * @private
 * @param {string} text - The text to insert
 * @return {Svg} this - The Svg instance
 */
Svg.prototype.__insertText = function (text) {
  if (this.hooks.insertText.length > 0) {
    for (let hook of this.hooks.insertText)
      text = hook.method(
        this.pattern.settings[this.pattern.activeSet].locale || 'en',
        text,
        hook.data
      )
  }

  return text
}

/**
 * Returns SVG markup for a linebreak + indentation
 *
 * @private
 * @return {string} svg - The Svg markup for a linebreak + indentation
 */
Svg.prototype.__nl = function () {
  return '\n' + this.__tab()
}

/**
 * Decreases indentation by 1
 *
 * @private
 * @return {Svg} this - The Svg instance
 */
Svg.prototype.__outdent = function () {
  this.tabs -= 1

  return this
}

/**
 * Returns SVG markup to open a group
 *
 * @private
 * @param {text} id - The group id
 * @param {Attributes} attributes - Any other attributes for the group
 * @return {string} svg - The SVG markup to open a group
 */
Svg.prototype.__openGroup = function (id, attributes = false) {
  let svg = this.__nl() + this.__nl()
  svg += `<!-- Start of group #${id} -->`
  svg += this.__nl()
  svg += `<g id="${id}"`
  if (attributes) svg += ` ${attributes.render()}`
  svg += '>'
  this.__indent()
  this.openGroups.push(id)

  return svg
}

/**
 * Returns SVG markup for a circle
 *
 * @private
 * @param {Point} point - The Point instance that holds the circle data
 * @return {string} svg - The SVG markup for the circle
 */
Svg.prototype.__renderCircle = function (point) {
  return `<circle cx="${round(point.x)}" cy="${round(point.y)}" r="${point.attributes.get(
    'data-circle'
  )}" ${point.attributes.renderIfPrefixIs('data-circle-')}></circle>`
}

/**
 * Returns SVG markup for the defs block
 *
 * @private
 * @return {string} svg - The SVG markup for the defs block
 */
Svg.prototype.__renderDefs = function () {
  let svg = '<defs>'
  this.__indent()
  svg += this.__nl() + this.defs.render()
  this.__outdent()
  svg += this.__nl() + '</defs>' + this.__nl()

  return svg
}

/**
 * Returns SVG markup for the head section
 *
 * @private
 * @return {string} svg - The SVG markup for the head section
 */
Svg.prototype.__renderHead = function () {
  let svg = this.__renderStyle()
  svg += this.__renderDefs()
  svg += this.__openGroup(this.idPrefix + 'container')

  return svg
}

/**
 * Returns SVG markup for a Path object
 *
 * @private
 * @param {Path} part - The Path instance to render
 * @return {string} svg - The SVG markup for the Path object
 */
Svg.prototype.__renderPath = function (path) {
  if (!path.attributes.get('id')) path.attributes.add('id', this.idPrefix + this.__getId())
  path.attributes.set('d', path.asPathstring())

  return `${this.__nl()}<path ${path.attributes.render()} />${this.__renderPathText(path)}`
}

/**
 * Returns SVG markup for the text on a Path object
 *
 * @private
 * @param {Path} path - The Path instance that holds the text render
 * @return {string} svg - The SVG markup for the text on a Path object
 */
Svg.prototype.__renderPathText = function (path) {
  let text = path.attributes.get('data-text')
  if (!text) return ''
  else this.text = this.__insertText(text)
  let attributes = path.attributes.renderIfPrefixIs('data-text-')
  // Sadly aligning text along a patch can't be done in CSS only
  let offset = ''
  let align = path.attributes.get('data-text-class')
  if (align && align.indexOf('center') > -1) offset = ' startOffset="50%" '
  else if (align && align.indexOf('right') > -1) offset = ' startOffset="100%" '
  let svg = this.__nl() + '<text>'
  this.__indent()
  svg += `<textPath xlink:href="#${path.attributes.get(
    'id'
  )}" ${offset}><tspan ${attributes}>${this.__escapeText(this.text)}</tspan></textPath>`
  this.__outdent()
  svg += this.__nl() + '</text>'

  return svg
}

/**
 * Returns SVG markup for a Part object
 *
 * @private
 * @param {Part} part - The Part instance to render
 * @return {string} svg - The SVG markup for the Part object
 */
Svg.prototype.__renderPart = function (part) {
  let svg = this.__openGroup(
    `${this.idPrefix}stack-${this.activeStack}-part-${part.name}`,
    part.attributes
  )
  for (let key in part.paths) {
    let path = part.paths[key]
    if (!path.hidden) svg += this.__renderPath(path)
  }
  for (let key in part.points) {
    if (part.points[key].attributes.get('data-text')) {
      svg += this.__renderText(part.points[key])
    }
    if (part.points[key].attributes.get('data-circle')) {
      svg += this.__renderCircle(part.points[key])
    }
  }
  for (let key in part.snippets) {
    let snippet = part.snippets[key]
    svg += this.__renderSnippet(snippet, part)
  }
  svg += this.__closeGroup()

  return svg
}

/**
 * Returns SVG markup for a snippet
 *
 * @private
 * @param {Snippet} snippet - The Snippet instance to render
 * @return {string} svg - The SVG markup for the snippet
 */
Svg.prototype.__renderSnippet = function (snippet) {
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
  let svg = this.__nl()
  svg += `<use x="${x}" y="${y}" `
  svg += `xlink:href="#${snippet.def}" ${snippet.attributes.render()}>`
  svg += '</use>'

  return svg
}

/**
 * Returns SVG markup for a Stack object
 *
 * @private
 * @param {Stack} stack - The Stack instance to render
 * @return {string} svg - The SVG markup for the Stack object
 */
Svg.prototype.__renderStack = function (stack) {
  let svg = ''
  for (const part of stack.parts) svg += this.__renderPart(part)

  return svg
}

/**
 * Returns SVG markup for the style block
 *
 * @private
 * @return {string} svg - The SVG markup for the style block
 */
Svg.prototype.__renderStyle = function () {
  let svg = '<style type="text/css"> <![CDATA[ '
  this.__indent()
  svg += this.__nl() + this.style
  this.__outdent()
  svg += this.__nl() + ']]>' + this.__nl() + '</style>' + this.__nl()
  return svg
}

/**
 * Returns SVG markup for the opening SVG tag
 *
 * @private
 * @return {string} svg - The SVG markup for the SVG tag
 */
Svg.prototype.__renderSvgTag = function () {
  let svg = '<svg'
  this.__indent()
  svg += this.__nl() + this.attributes.render()
  this.__outdent()
  svg += this.__nl() + '>' + this.__nl()

  return svg
}

/**
 * Returns SVG markup for the closing section
 *
 * @private
 * @return {string} svg - The SVG markup for the closing section
 */
Svg.prototype.__renderTail = function () {
  let svg = ''
  svg += this.__closeGroup()
  svg += this.__nl() + '</svg>'

  return svg
}

/**
 * Returns SVG markup for text
 *
 * @private
 * @param {Point} point - The Point instance that holds the text render
 * @return {string} svg - The SVG markup for text
 */
Svg.prototype.__renderText = function (point) {
  let text = point.attributes.getAsArray('data-text')
  if (text !== false) {
    let joint = ''
    for (let string of text) {
      this.text = this.__insertText(string)
      joint += this.text + ' '
    }
    this.text = this.__insertText(joint)
  }
  point.attributes.set('data-text-x', round(point.x))
  point.attributes.set('data-text-y', round(point.y))
  let lineHeight =
    point.attributes.get('data-text-lineheight') || 6 * (this.pattern.settings.scale || 1)
  point.attributes.remove('data-text-lineheight')
  let svg = `${this.__nl()}<text ${point.attributes.renderIfPrefixIs('data-text-')}>`
  this.__indent()
  // Multi-line text?
  if (this.text.indexOf('\n') !== -1) {
    let lines = this.text.split('\n')
    svg += `<tspan>${lines.shift()}</tspan>`
    for (let line of lines) {
      svg += `<tspan x="${round(point.x)}" dy="${lineHeight}">${line}</tspan>`
    }
  } else {
    svg += `<tspan>${this.__escapeText(this.text)}</tspan>`
  }
  this.__outdent()
  svg += this.__nl() + '</text>'

  return svg
}

/**
 * Runs SVG lifecycle hooks
 *
 * @private
 * @param {string} hookName - The lifecycle hook to run
 * @param {mixed} data - Any data to pass to the hook method
 * @return {string} svg - The SVG markup for the indentation
 */
Svg.prototype.__runHooks = function (hookName, data = false) {
  if (data === false) data = this
  let hooks = this.hooks[hookName]
  if (hooks.length > 0) {
    for (let hook of hooks) {
      hook.method(data, hook.data)
    }
  }
}

/**
 * Returns SVG markup for indentation
 *
 * @private
 * @return {string} svg - The SVG markup for the indentation
 */
Svg.prototype.__tab = function () {
  let space = ''
  for (let i = 0; i < this.tabs; i++) {
    space += '  '
  }

  return space
}
