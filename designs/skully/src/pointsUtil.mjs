function convertPoints(points, rotate = 0, flip = false) {
  var p = []
  Object.keys(points).forEach(function (key, index) {
    var point = points[key].clone()
    if (key != 'point0') {
      if (flip) {
        point = points[key].flipX()
      }
      if (rotate != 0) {
        point = points[key].rotate(rotate, points['point0'])
      }
    }

    if (key == 'point0') {
      p.push('points.point0 = new Point( 0, 0 );')
    } else if (key.match('.+[0-9]Cp[12]')) {
      let masterPointKey = key.replace(/Cp[12]/, '')
      let masterPoint = points[masterPointKey]
      if (flip) {
        masterPoint = masterPoint.flipX()
      }
      if (rotate != 0) {
        masterPoint = masterPoint.rotate(rotate, points['point0'])
      }
      p.push(
        'points.' +
          key +
          ' = points.' +
          masterPointKey +
          '.shift( ' +
          masterPoint.angle(point) +
          ', ' +
          masterPoint.dist(point) +
          ' *sizeFactor );'
      )
    } else {
      p.push(
        'points.' +
          key +
          ' = points.point0.shift( ' +
          points.point0.angle(point) +
          ', ' +
          points.point0.dist(point) +
          ' *sizeFactor );'
      )
    }
  })

  console.log(p.sort().join('\n'))
}

export { convertPoints }
