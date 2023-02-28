/**
 * A queue for handling the draft order of pattern parts
 * Unlike most queues, traversing this queue is non-destructive
 * so that the queue can be traversed many times.
 * The goal is to allow the queue to be manipulated while being traversed
 * @class
 * @param {Pattern} pattern the pattern that will use the queue
 */
export function PatternDraftQueue(pattern) {
  // save the config resolver
  this.__configResolver = pattern.__configResolver
  // get the draft order in its current state
  this.queue = this.__resolveDraftOrder()
  // start at 0
  this.start()
}

/** Go back to the beginning of the queue */
PatternDraftQueue.prototype.start = function () {
  this.queueIndex = 0
}

/**
 * Add a part to end of the queue. Useful for queueing up parts a draft time
 * @param {string} partName the name to the part to add
 */
PatternDraftQueue.prototype.addPart = function (partName) {
  if (!this.contains(partName)) this.queue.push(partName)
  return this
}

/**
 * Check whether the queue has a next part without moving the queue index
 * @return {Boolean} whether there is a next part in the queue
 */
PatternDraftQueue.prototype.hasNext = function () {
  return this.queueIndex < this.queue.length
}

/**
 * Get the next part in the queue without moving the queue index
 * @return {string} the next part in the queue
 */
PatternDraftQueue.prototype.peek = function () {
  return this.queue[this.queueIndex]
}

/**
 * Get the next part in the queue and move the queue index
 * @return {string} the next part in the queue
 */
PatternDraftQueue.prototype.next = function () {
  const next = this.peek()
  this.queueIndex++
  return next
}

/**
 * Check whether a part is already queued
 * @param  {string} partName the name of the part
 * @return {boolean}          whether the part is in the queue
 */
PatternDraftQueue.prototype.contains = function (partName) {
  return this.queue.indexOf(partName) !== -1
}

/**
 * Resolves the draft order based on the configuation
 * @private
 * @return A list of parts in the order they should be drafted
 */
PatternDraftQueue.prototype.__resolveDraftOrder = function () {
  const partDistances = this.__configResolver.__mutated.partDistance
  return Object.keys(this.__configResolver.parts).sort(
    (p1, p2) => partDistances[p2] - partDistances[p1]
  )
}
