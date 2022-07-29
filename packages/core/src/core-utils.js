/** Utils that are not meant to be exposed in part.shorthand().utils */

/** Generates the transform attributes needed for a given part */
export const generatePartTransform = (x, y, rotate, flipX, flipY, part) => {

  const transforms = []
  let xTotal = x || 0;
  let yTotal = y || 0;
  let scaleX = 1
  let scaleY = 1

  if (flipX) {
    scaleX = -1
    xTotal += part.topLeft.x * 2 + part.width
  }
  if (flipY) {
    scaleY = -1
    yTotal += part.topLeft.y * 2 + part.height
  }

  if (scaleX + scaleY < 2) {
    transforms.push(`scale(${scaleX} ${scaleY})`)
  }

  if (rotate) {
    const center = {
      x: part.topLeft.x + part.width/2,
      y: part.topLeft.y + part.height/2,
    }

    transforms.push(`rotate(${rotate} ${center.x} ${center.y})`)
  }

  if (xTotal > 0 || yTotal > 0) transforms.unshift(
    `translate(${xTotal} ${yTotal})`
  )

  return {
    transform: transforms.join(' '),
    // 'transform-origin': `${center.x} ${center.y}`
  }
}

export const getPartCutlist = (partName, config, settings) => {
  // FIXME this won't be needed when cutlist is properly implemented
  return {cut: 1}
}
