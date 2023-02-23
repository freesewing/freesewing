export function PatternDraftQueue(pattern) {
  this.__configResolver = pattern.__configResolver
  this.queue = this.__resolveDraftOrder()
  this.start()
}

PatternDraftQueue.prototype.start = function () {
  this.queueIndex = 0
}

PatternDraftQueue.prototype.addPart = function (partName) {
  this.queue.push(partName)
  return this
}

PatternDraftQueue.prototype.hasNext = function () {
  return this.queueIndex < this.queue.length
}

PatternDraftQueue.prototype.peek = function () {
  return this.queue[this.queueIndex]
}

PatternDraftQueue.prototype.next = function () {
  const next = this.peek()
  this.queueIndex++
  return next
}

/**
 * Resolves the draft order based on the configuation
 *
 * @private
 * @param {object} graph - The object of resolved dependencies, used to call itself recursively
 * @return {Pattern} this - The Pattern instance
 */
PatternDraftQueue.prototype.__resolveDraftOrder = function () {
  const partDistances = this.__configResolver.__mutated.partDistance
  return Object.keys(this.__configResolver.parts).sort(
    (p1, p2) => partDistances[p2] - partDistances[p1]
  )
}
