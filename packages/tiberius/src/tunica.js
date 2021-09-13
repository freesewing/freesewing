export default function(part) {
    let {
	Point,
	points,
	Path,
	paths,
	measurements,
	options,
	macro,
	complete,
	snippets,
	Snippet,
	sa,
	paperless,
    } = part.shorthand();
    
    // define some variables

    let width
    if (options.width === 'ToElbow'){width = measurements.shoulderToElbow}
    if (options.width === 'ToMidArm'){width = measurements.shoulderToElbow/2}
    if (options.width === 'ToShoulder'){width = 0} // careful! takes other measurements if those are bigger to ensure that the tunica actually fits your body, use forceWidth if you know what you're doing

    let hem_pos
    if (options.length === 'ToKnee'){hem_pos = measurements.waistToKnee}
    if (options.length === 'ToMidLeg'){hem_pos = measurements.waistToKnee/1.3}//UpperLeg}
    if (options.length === 'ToFloor'){hem_pos = measurements.waistToFloor*0.95}
    
    let hwidth = (measurements.shoulderToShoulder/2 + width) * options.widthBonus
    let length = (measurements.hpsToWaistBack + hem_pos) * options.lengthBonus
    let hhead = (measurements.head/4)*options.headRatio
    let armhole = measurements.biceps/2*1.3*options.armholeDrop
    let clavusPos = hhead*options.clavusPosBonus
    let clavusWidth = options.clavusWidth*hwidth/13/options.widthBonus

    // some checks, can be circumvented with forceWidth
    if (options.forceWidth === false ){
	if (hwidth < measurements.waist/4)
	{hwidth = measurements.waist/4*options.widthBonus}
	if (hwidth < measurements.hips/4)
	{hwidth = measurements.hips/4*options.widthBonus}
	if (hwidth < measurements.chest/4)
	{hwidth = measurements.chest/4*options.widthBonus}
	if (hwidth < measurements.seat/4)
	{hwidth = measurements.seat/4*options.widthBonus}
    }
    
    // make points
    points.top = new Point(0,0)
    points.bottom = new Point(0,length)
    points.topLeft = points.top.shift(0,-hwidth)
    points.bottomLeft = points.bottom.shift(0,points.bottom.dx(points.topLeft))
    points.headLeft = points.top.shift(180, hhead)
    points.armholeLeft = points.topLeft.shift(-90,armhole)

    // draw paths
    paths.seam = new Path()
	.move(points.top)
	.line(points.topLeft)
	.line(points.bottomLeft)
	.attr('class', 'fabric')
    	
    paths.hem = new Path()
	.move(points.bottomLeft)
	.line(points.bottom)
	.attr('class', 'fabric')
   
    paths.fold = new Path()
	.move(points.bottom)
	.line(points.top)
	.attr('class', 'fabric') 

    // clavi
    if (options.clavi) {
	
	// make points
	points.clavusTopRight = points.top.shift(180, clavusPos)
	points.clavusBottomRight = points.bottom.shift(0,points.top.dx(points.clavusTopRight))
	points.clavusTopLeft = points.clavusTopRight.shift(180,clavusWidth)
	points.clavusBottomLeft = points.bottom.shift(0,points.top.dx(points.clavusTopLeft))

	// draw paths
	paths.clavusRight = new Path()
	    .move(points.clavusTopRight)
	    .line(points.clavusBottomRight)
	    .attr("class", "various dashed")
	paths.clavusLeft = new Path()
	    .move(points.clavusTopLeft)
	    .line(points.clavusBottomLeft)
	    .attr("class", "various dashed")
	    .attr("data-text", "BiasTape")
	    .attr("data-text-class", "center fill-various")
    }
	
    // Complete?
    if (complete) {
	// notches
	snippets.hl = new Snippet('notch', points.headLeft)
	snippets.al = new Snippet('notch', points.armholeLeft)

	// cut on fold
	macro('cutonfold', {
	    from: points.bottom,
	    to: points.top,
	    grainline: true,
	})

	// logo & title
	points.logo = points.top.shift(45,points.bottom.dy(points.top)/3)
	snippets.logo = new Snippet("logo", points.logo)
	points.title = points.logo.shift(90, points.bottom.dy(points.top)/4)
	macro("title", {
	    at: points.title,
	    nr: 1,
	    title: "tunica"
	})
	points.__titleNr.attr('data-text-class', 'center')
	points.__titleName.attr('data-text-class', 'center')
	points.__titlePattern.attr('data-text-class', 'center')

	// scalebox
	points.scalebox = points.title.shift(90, points.bottom.dy(points.top)/5)
	macro("scalebox", { at: points.scalebox })

	// seam allowance
	if (sa) {
	    paths.sa = paths.seam.offset(sa)
		.join(paths.hem.offset(sa * 2.5))
		.close()
		.attr('class', 'fabric sa')
	}
	
	// Paperless?
	if (paperless) {
	    macro("vd", {
		from: points.top,
		to: points.bottom,
		x: points.bottomLeft.x+10
	});
	    
	    macro("vd", {
		from: points.armholeLeft,
		to: points.bottomLeft,
		x: points.armholeLeft.x - 15
	    });
	    macro("vd", {
		from: points.topLeft,
		to: points.armholeLeft,
		x: points.armholeLeft.x - 15
	    });
	    
	    macro("hd", {
		from: points.topLeft,
	    to: points.top,
		y: points.top.y + 15
	    });
	    
	    macro("hd", {
		from: points.headLeft,
		to: points.top,
		y: points.top.y - 15
	    });
	    macro("hd", {
		from: points.topLeft,
		to: points.headLeft,
		y: points.top.y - 15
	    });

	    // for clavi
	    if (options.clavi){
		macro("hd", {
		    from: points.clavusTopLeft,
		    to: points.clavusTopRight,
		    y: points.clavusTopLeft.y + 25
		});
		macro("hd", {
		    from: points.clavusTopRight,
		    to: points.headLeft,
		    y: points.clavusTopRight.y + 25
		});
		macro("hd", {
		    from: points.topLeft,
		    to: points.clavusTopLeft,
		    y: points.clavusTopLeft.y + 25
		});
		macro("hd", {
		    from: points.clavusTopRight,
		    to: points.top,
		    y: points.clavusTopLeft.y + 30
		});
	    }
	}
    }
    return part;
}
