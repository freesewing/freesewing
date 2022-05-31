export default function (part) {
  const { options, Point, Path, points, paths, Snippet, snippets, complete, sa, paperless, macro } =
    part.shorthand()


    //pocket seams here 
  let pocketLength = 800 * options.length
  let pocketWidth = 500 * options.width
  let pocketEdge = options.edge


  points.topLeft = new Point(0, 0)
  points.topRight = new Point(pocketWidth, 0)
  points.bottomLeft = new Point(0, pocketLength)
  points.bottomRight = new Point(pocketWidth, pocketLength)

  //center point
  points.center = new Point((pocketWidth / 2), 0)

  //slit end 
 points.middle = points.center.shift(270,(pocketLength*0.525)) 
  
 //top 

 points.centerRight = points.center.shift(0, (pocketWidth * pocketEdge))
 points.centerLeft = points.center.shift(180, (pocketWidth * pocketEdge))
 
 //taper point 
 points.taperRight = new Point(pocketWidth, (pocketLength * 0.4375))
 points.taperLeft = new Point(0, (pocketLength * 0.4375))

 //control points curve

 points.leftCp1 = points.bottomLeft.shiftFractionTowards(points.taperLeft, 2 / 7)
 points.leftCp2 = points.bottomLeft.shiftFractionTowards(points.bottomRight, 0.2)

 points.rightCp1 = points.bottomRight.shiftFractionTowards(points.taperRight, 2 / 7)
 points.rightCp2 = points.bottomRight.shiftFractionTowards(points.bottomLeft, 0.2)



  paths.seam = new Path()
    .move(points.centerLeft)
    .line(points.taperLeft)
    .line(points.leftCp1)
    .curve_(points.bottomLeft, points.leftCp2)
    .line(points.rightCp2)
    .curve_(points.bottomRight, points.rightCp1)
    .line(points.taperRight)
    .line(points.centerRight)
    .close()
    
  // Complete?
  if (complete) {
  
  paths.slit = new Path()
  .move(points.center)
  .line(points.middle)
  .attr("class", "path fabric dashed")
  
    points.logo = points.center.shiftOutwards(points.middle, pocketWidth / 5)
    snippets.logo = new Snippet('logo', points.logo)
    
    points.scalebox = points.logo
      .shift(270, pocketWidth / 5)
      macro("scalebox", { at: points.scalebox })  
      
    if (sa) {
      paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')
    }
  }

  // Paperless?
  if (paperless) {
    macro('hd', {
      from: points.bottomLeft,
      to: points.bottomRight,
      y: points.bottomLeft.y + sa + 15,
    })
    macro('vd', {
      from: points.bottomRight,
      to: points.topRight,
      x: points.topRight.x + sa + 15,
    })
    macro('hd', {
      from: points.centerLeft,
      to: points.centerRight,
      y: points.topLeft.y + sa + 15,
    })
    macro('vd', {
      from: points.center,
      to: points.middle,
      y: points.center.x + sa + 15,
    })
  }

  return part
}
