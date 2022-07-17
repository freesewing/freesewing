/** Utils that are not meant to be exposed in part.shorthand().utils */

/** Generates the transform attributes needed for a given part */
export const generatePartTransform = (x, y, rotate, flipX, flipY, part) => {
  const center = {
    x: part.topLeft.x + (part.bottomRight.x - part.topLeft.x)/2,
    y: part.topLeft.y + (part.bottomRight.y - part.topLeft.y)/2,
  }

  const transforms = []
  if (x !== undefined && y !== undefined) transforms.push(
    `translate(${x},${y})`
  )
  if (flipX) transforms.push(
    'scale(-1, 1)',
  )
  if (flipY) transforms.push(
    'scale(1, -1)',
  )
  if (rotate) transforms.push(
    `rotate(${rotate})`
  )

  return {
    transform: transforms.join(' '),
    'transform-origin': `${center.x} ${center.y}`
  }
}

export const getPartCutlist = (partName, config) => {
  let partCuts = config.cutList?.[partName]
  if (partCuts) {
    return typeof partCuts === 'function' ? partCuts(this.settings) : {... partCuts}
  }

  return {cut: 1}
}
