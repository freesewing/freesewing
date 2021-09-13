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
	store
    } = part.shorthand();
    

// set different lengths of lacerna
    let hem_pos
    if (options.length === 'ToKnee'){hem_pos = measurements.waistToKnee}
    if (options.length === 'ToBelowKnee'){hem_pos = 1.3*measurements.waistToKnee}
    if (options.length === 'ToHips'){hem_pos = measurements.waistToHips}
    if (options.length === 'ToUpperLeg'){hem_pos = measurements.waistToUpperLeg}
    if (options.length === 'ToFloor'){hem_pos = measurements.waistToFloor}
    // define some variables
//    let hwidth = (measurements.shoulderToShoulder/2 + measurements.shoulderToElbow) * options.widthBonus
    let length = (measurements.hpsToWaistBack + hem_pos) * options.lengthBonus
    let hneck = (measurements.neck/2)*1.1*options.neckRatio
    let width = (0.6*measurements.shoulderToShoulder + 1.8*measurements.shoulderToElbow) * options.widthBonus
    let leftLength = measurements.hpsToWaistBack+measurements.waistToHips
    
    // make points
    points.top = new Point(0,0)
    points.bottom = new Point(0,length)
    points.topLeft = points.top.shift(180,width)
    points.bottomLeft = points.topLeft.shift(-90,points.top.dy(points.bottom))
    //points.topRight = points.topLeft.flipX()
    //points.bottomRight = points.bottomLeft.flipX()

    points.middleLeft = points.topLeft.shift(-90,leftLength)
    
    points.topShoulder = points.top.shift(180,width - 1.2*measurements.shoulderToElbow)
    points.bottomShoulder = points.topShoulder.shift(-90,points.top.dy(points.bottom))
    points.bottomShoulderCp = points.bottomLeft.copy().shiftFractionTowards(points.top,0.05)
    
    paths.fold = new Path()
	.move(points.bottom)
	.line(points.top)

    paths.seam = new Path()
	.move(points.top)
	.line(points.topLeft)

    paths.hem = new Path()
	.move(points.topLeft)
	.line(points.middleLeft)
	.curve_(points.bottomShoulderCp,points.bottomShoulder)
	.line(points.bottom)

    // draw other paths
    
	
    // Complete?
    
    if (complete) {
	snippets.shoulder = new Snippet('notch', points.topShoulder)

		// cut on fold
	macro('cutonfold', {
	    from: points.bottom,
	    to: points.top,
	    grainline: true,
	})

	// logo & title
	points.logo = points.top.shift(45,points.bottom.dy(points.top)/3);
	snippets.logo = new Snippet("logo", points.logo);
	points.title = points.logo.shift(90, points.bottom.dy(points.top)/4);
	macro("title", {
	    at: points.title,
	    nr: 1,
	    title: "lacerna"
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
		.join(paths.hem.offset(sa * 1.5))
		.close()
		.attr('class', 'fabric sa')
	    }
	
	// Paperless?
	if (paperless) {    	    
	    macro("hd", {
		from: points.topLeft,
		to: points.top,
		y: points.top.y - 20
	    })
	    	    macro("vd", {
		from: points.top,
		to: points.bottom,
		x: points.top.x +10
	    })
	    macro("hd", {
		from: points.topLeft,
		to: points.topShoulder,
		y: points.top.y - 10
	    })
	    macro("hd", {
		from: points.topShoulder,
		to: points.top,
		y: points.top.y - 10
	    })
	    macro("hd", {
		from: points.bottomShoulder,
		to: points.bottom,
		y: points.bottom.y + 10
	    })
	    macro("hd", {
		from: points.bottomShoulder,
		to: points.bottomLeft,
		y: points.bottom.y + 10
	    })
	    	    macro("vd", {
		from: points.topLeft,
		to: points.middleLeft,
		x: points.topLeft.x - 10
		    })
	    	    macro("ld", {
		from: points.middleLeft,
		to: points.bottomShoulder,
		d: 0
	    })

	    	    macro("vd", {
		from: points.middleLeft,
		to: points.bottomLeft,
		x: points.bottomLeft.x - 10
		    })



	}
    }
    return part;
}
