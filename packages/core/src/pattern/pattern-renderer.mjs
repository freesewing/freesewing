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
  }

  for (const set of this.pattern.parts) {
    const setParts = {}
    for (let p in set) {
      if (!set[p].hidden) {
        setParts[p] = {
          ...set[p].asProps(),
          store: this.pattern.setStores[set[p].set],
        }
      } else if (this.pattern.setStores[set.set]) {
        this.pattern.setStores[set.set].log.info(
          `Part${p} is hidden in set ${set.set}. Not adding to render props`
        )
      }
    }
    props.parts.push(setParts)
  }
  props.stacks = {}
  for (let s in this.pattern.stacks) {
    if (!this.pattern.__isStackHidden(s)) {
      props.stacks[s] = this.pattern.stacks[s].asProps()
    } else this.pattern.store.log.info(`Stack ${s} is hidden. Skipping in render props.`)
  }
  props.logs = {
    pattern: this.pattern.store.logs,
    sets: this.pattern.setStores.map((store) => ({
      debug: store.logs.debug,
      info: store.logs.info,
      error: store.logs.error,
      warning: store.logs.warning,
    })),
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
  const { settings, setStores, parts } = this.pattern
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
      if (settings[0].layout === true)
        bins.push({ id: key, width: stack.width, height: stack.height })
      else {
        if (this.width < stack.width) this.width = stack.width
        if (this.height < stack.height) this.height = stack.height
      }
    }
  }
  if (settings[0].layout === true) {
    // some plugins will add a width constraint to the settings, but we can safely pass undefined if not
    let size = pack(bins, { inPlace: true, maxWidth: settings[0].maxWidth })
    for (let bin of bins) {
      this.autoLayout.stacks[bin.id] = { move: {} }
      let stack = this.stacks[bin.id]
      if (bin.x !== 0 || bin.y !== 0) {
        stack.attr('transform', `translate(${bin.x}, ${bin.y})`)
      }
      this.autoLayout.stacks[bin.id].move = {
        x: bin.x + stack.layout.move.x,
        y: bin.y + stack.layout.move.y,
      }
    }
    this.width = size.width
    this.height = size.height
  } else if (typeof settings[0].layout === 'object') {
    this.width = settings[0].layout.width
    this.height = settings[0].layout.height
    for (let stackId of Object.keys(settings[0].layout.stacks)) {
      // Some parts are added by late-stage plugins
      if (this.stacks[stackId]) {
        let transforms = settings[this.activeStack || 0].layout.stacks[stackId]
        this.stacks[stackId].generateTransform(transforms)
      }
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
