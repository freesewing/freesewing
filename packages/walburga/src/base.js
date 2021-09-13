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
	store,
	utils
    } = part.shorthand();
    
    // define some variables

//    let width
    //if (options.width === 'ToElbow'){width = measurements.shoulderToElbow}
    //if (options.width === 'ToMidArm'){width = measurements.shoulderToElbow/2}
 //   if (options.width === 'ToShoulder'){width = 0} // careful! takes other measurements if those are bigger to ensure that the tunica actually fits your body, use forceWidth if you know what you're doing

    let hem_pos
    if (options.length === 'ToKnee'){hem_pos = measurements.waistToKnee}
    if (options.length === 'ToMidLeg'){hem_pos = measurements.waistToKnee/1.3}//UpperLeg}
    if (options.length === 'ToFloor'){hem_pos = measurements.waistToFloor*0.95}

    let hiplength = (measurements.hpsToWaistBack + measurements.waistToHips)*options.hipLengthBonus
    let hwidth = (measurements.shoulderToShoulder/2) * options.widthBonus
    let length = (measurements.hpsToWaistBack + hem_pos) * options.lengthBonus
    let hhead = (measurements.head/4)*options.headRatio

    let goldenRatio = 1.618033

    
    store.set('hhead',hhead)
    store.set('goldenRatio',goldenRatio)

    //let armhole = measurements.biceps/2*1.3*options.armholeDrop
    
    // make points
    points.top = new Point(0,0)
    points.bottom = new Point(0,length)
    points.topLeft = points.top.shift(0,-hwidth)
    points.bottomLeft = points.bottom.shift(0,points.bottom.dx(points.topLeft))
    points.headLeft = points.top.shift(180, hhead)
    //points.armholeLeft = points.topLeft.shift(-90,armhole)
    points.bottomMiddle = points.bottom.shiftFractionTowards(points.bottomLeft,.5)
    points.hips = points.top.shift(-90,hiplength)
    points.hipsLeft = points.hips.shift(0,points.bottom.dx(points.bottomLeft))


    points.triangle = points.bottom.shift(90,points.bottomLeft.dx(points.bottom)/goldenRatio) // golderatio proportinal to width
//    points.triangle = points.hips.shift(-90,points.hips.dy(points.bottom)/goldenRatio) // with GoldenRation between vertical lengths
    points.triangleLeft = points.triangle.shift(0,points.bottom.dx(points.bottomLeft))


    
    // draw paths
    paths.seam = new Path()
	.move(points.top)
	.line(points.topLeft)
	.line(points.triangleLeft)
	.line(points.bottomMiddle)
	.line(points.triangle)
//	.line(points.bottomLeft)
	.attr('class', 'fabric')
    	
  //  paths.hem = new Path()
//	.move(points.bottomLeft)
//	.line(points.bottom)
//	.attr('class', 'fabric')
   
    paths.fold = new Path()
	.move(points.triangle)
	.line(points.top)
	.attr('class', 'fabric') 

	
    // Complete?
    if (complete) {
	// notches
	if (options.neckline === false){
	snippets.hl = new Snippet('notch', points.headLeft)
	}
	    
	// cut on fold
	
	macro('cutonfold', {
	    from: points.triangle,
	    to: points.top,
	    grainline: true,
	})

	// logo & title
	points.logo = points.top.shift(45,points.bottom.dy(points.top)/5)
	snippets.logo = new Snippet("logo", points.logo)
	points.title = points.logo.shift(90, points.bottom.dy(points.top)/4)
	macro("title", {
	    at: points.title,
	    nr: 1,
	    title: "wappenrock-front"
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
//		.join(paths.hem.offset(sa * 2.5))
		.close()
		.attr('class', 'fabric sa')

// make sa correct for corners
	    points.samod = points.triangle.shiftFractionTowards(points.top,-0.1)
	    paths.samod = new Path()
		.move(points.triangle)
		.line(points.samod)
		.setRender(false)

	    let sasplit = paths.samod.intersects(paths.sa)
	    points.sasplit = sasplit[0]

	    let sahalves = paths.sa.split(points.sasplit)
	    paths.sa = sahalves[0]
		.close()
		.attr('class', 'fabric sa')

	    
//	    paths.saadd = new Path()
//		.move(points.sasplit)
//		.line(points.top)
	    
	}
	
	// Paperless?
	if (paperless) {
	    macro("vd", {
		from: points.top,
		to: points.bottom,
		x: points.bottom.x+10
	});
	    macro("vd", {
		from: points.triangleLeft,
		to: points.bottomLeft,
		x: points.bottomLeft.x-10
	});

	    macro("vd", {
		from: points.topLeft,
		to: points.triangleLeft,
		x: points.bottomLeft.x-10
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
	    macro("hd", {
		from: points.triangleLeft,
		to: points.bottomMiddle,
		y: points.triangleLeft.y
	    });
	    macro("vd", {
		from: points.hipsLeft,
		to: points.triangleLeft,
		x: points.triangleLeft.x + 5
	    });
	   macro("ld", {
		from: points.triangleLeft,
		to: points.bottomMiddle,
		d: -10
	    });
	}
    }
    return part;
}
