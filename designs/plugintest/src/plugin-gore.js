const draftDimension = (part) => {
  const { points, Point, options, macro } = part.shorthand()

  if (['gore', 'all'].indexOf(options.plugin) !== -1) {
    points.start = new Point(10, 10)
    macro('gore', {
      from: points.start,
      radius: options.goreRadius,
      gores: options.goreGoreNumber,
      extraLength: options.goreExtraLength,
      render: true,
    })
  }
  return part
}

export default draftDimension
