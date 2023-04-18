import { Svg } from '../svg.mjs'
import { Stack } from '../stack.mjs'
import pack from 'bin-pack-with-constraints'

export function PatternRenderer(pattern) {
  this.pattern = pattern
  this.autoLayout = pattern.autoLayout
}

/**
 * Renders the pattern to SVG
 *
 * @return {string} svg - The rendered SVG
 */
PatternRenderer.prototype.render = function () {
  this.__startRender()
  this.pattern.svg = this.svg
  return this.svg.render()
}

/** Returns props required to render this pattern through
 *  an external renderer (eg. a React component)
 *
 * @return {object} this - The Pattern instance
 */
PatternRenderer.prototype.getRenderProps = function () {
  this.pattern.store.log.info('Gathering render props')
  // Run pre-render hook
  this.__startRender()
  this.svg.__runHooks('preRender')

  let props = {
    svg: this.svg,
    width: this.pattern.width,
    height: this.pattern.height,
    autoLayout: this.pattern.autoLayout,
    settings: this.pattern.settings,
    parts: [],
    stacks: {},
  }

  for (const partSet of this.pattern.parts) {
    const setPartProps = {}
    for (let partName in partSet) {
      const part = partSet[partName]
      if (!part.hidden) {
        setPartProps[partName] = {
          ...partSet[partName].asProps(),
          store: this.pattern.setStores[part.set],
        }
      } else if (this.pattern.setStores[part.set]) {
        this.pattern.setStores[part.set].log.info(
          `Part ${partName} is hidden in set ${part.set}. Not adding to render props`
        )
      }
    }
    props.parts.push(setPartProps)
  }

  for (let s in this.pattern.stacks) {
    if (!this.pattern.__isStackHidden(s)) {
      props.stacks[s] = this.pattern.stacks[s].asProps()
    } else this.pattern.store.log.info(`Stack ${s} is hidden. Skipping in render props.`)
  }

  props.logs = {
    pattern: this.pattern.store.logs,
    sets: this.pattern.setStores.map((store) => store.logs),
  }

  this.svg.__runHooks('postRender')
  return props
}

PatternRenderer.prototype.__startRender = function () {
  this.svg = new Svg(this.pattern)
  this.svg.hooks = this.pattern.plugins.hooks
  this.__pack()

  return this
}

PatternRenderer.prototype.__stack = function () {
  // First, create all stacks
  this.stacks = {}
  const settings = this.pattern.settings
  for (const set in settings) {
    for (const [name, part] of Object.entries(this.pattern.parts[set])) {
      const stackName =
        settings[set].stackPrefix +
        (typeof part.stack === 'function' ? part.stack(settings[set], name) : part.stack)
      if (typeof this.stacks[stackName] === 'undefined')
        this.stacks[stackName] = this.__createStackWithContext(stackName, set)
      this.stacks[stackName].addPart(part)
    }
  }

  this.pattern.stacks = this.stacks
}
/**
 * Packs stacks in a 2D space and sets pattern size
 *
 * @private
 * @return {Pattern} this - The Pattern instance
 */
PatternRenderer.prototype.__pack = function () {
  this.pattern.__runHooks('preLayout')
  const { settings, setStores, activeSet } = this.pattern
  for (const set in settings) {
    if (setStores[set].logs.error.length > 0) {
      setStores[set].log.warning(`One or more errors occured. Not packing pattern parts`)
      return this
    }
  }

  this.__stack()

  let bins = []
  for (const [key, stack] of Object.entries(this.stacks)) {
    // Avoid multiple render calls to cause addition of transforms
    stack.attributes.remove('transform')
    if (!this.pattern.__isStackHidden(key)) {
      stack.home()
      if (settings[activeSet].layout === true)
        bins.push({ id: key, width: stack.width, height: stack.height })
    }
  }
  if (settings[activeSet].layout === true) {
    // some plugins will add a width constraint to the settings, but we can safely pass undefined if not
    let size = pack(bins, { inPlace: true, maxWidth: settings[0].maxWidth })
    this.autoLayout.width = size.width
    this.autoLayout.height = size.height

    for (let bin of bins) {
      let stack = this.stacks[bin.id]
      this.autoLayout.stacks[bin.id] = {
        move: {
          x: bin.x + stack.layout.move.x,
          y: bin.y + stack.layout.move.y,
        },
      }
    }
  }

  const packedLayout =
    typeof settings[activeSet].layout === 'object' ? settings[activeSet].layout : this.autoLayout

  this.width = packedLayout.width
  this.height = packedLayout.height
  for (let stackId of Object.keys(packedLayout.stacks)) {
    // Some parts are added by late-stage plugins
    if (this.stacks[stackId]) {
      let transforms = packedLayout.stacks[stackId]
      this.stacks[stackId].generateTransform(transforms)
    }
  }

  this.pattern.width = this.width
  this.pattern.height = this.height
  this.pattern.autoLayout = this.autoLayout
  this.pattern.__runHooks('postLayout')
  return this
}

/**
 * Instantiates a new Stack instance and populates it with the pattern context
 *
 * @private
 * @param {string} name - The name of the stack
 * @return {Stack} stack - The instantiated Stack
 */
PatternRenderer.prototype.__createStackWithContext = function (name) {
  // Context object to add to Stack closure
  const stack = new Stack()
  stack.name = name
  stack.context = {
    config: this.pattern.config,
    settings: this.pattern.settings,
    setStores: this.pattern.setStores,
  }

  return stack
}
