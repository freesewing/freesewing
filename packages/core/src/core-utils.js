/** Utils that are not meant to be exposed in part.shorthand().utils */

/** Generates the transform attributes needed for a given part */
export const generatePartTransform = (x, y, rotate, flipX, flipY, part) => {

  const transforms = []
  let xTotal = x;
  let yTotal = y;

  if (flipX) {
    console.log(part)
    transforms.push(
      `scale(-1, 1)`,
    )
    xTotal += part.topLeft.x * 2 + part.width
  }
  if (flipY) {
    transforms.push(
    `scale(1, -1)`,
    )
    yTotal += part.topLeft.y * 2 + part.height
  }


  const center = {
    x: part.topLeft.x + (part.bottomRight.x - part.topLeft.x)/2,
    y: part.topLeft.y + (part.bottomRight.y - part.topLeft.y)/2,
  }

  if (rotate) transforms.push(
    `rotate(${rotate} ${center.x} ${center.y})`
  )

  if (x !== undefined && y !== undefined) transforms.unshift(
    `translate(${xTotal},${yTotal})`
  )

  return {
    transform: transforms.join(' '),
    // 'transform-origin': `${center.x} ${center.y}`
  }
}

export const getPartCutlist = (partName, config, settings) => {
  let partCuts = config.cutList?.[partName]
  if (partCuts) {
    return typeof partCuts === 'function' ? partCuts(settings) : {... partCuts}
  }

  return {cut: 1}
}
