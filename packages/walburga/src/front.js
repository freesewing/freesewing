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


    let head = store.get('hhead')*2
    let goldenRatio = store.get('goldenRatio')
    let ratio = goldenRatio*options.neckoRatio


    if (options.neckline === true){
    
    // calculate neck opening
    let neckotop
    let neckomid// = hhead - neckotop
//    let necko = neckotop + neckomid

    // actual formula for triangle, from golden Ratio, measurement and Pythagoras
    neckotop = (1/4)*(-(ratio**2)*head+Math.sqrt(4*(head**2)*(ratio**2)+(head**2)*(ratio**4)))

    neckomid = (2*neckotop)/ratio
    
//	points.anchor = new Point(100, 50)
//	    .attr("data-text", neckotop)
//	    .attr("data-text", head)
//	    .attr("data-text", goldenRatio)
//	    .attr("data-text-class", "center");

        // checks to ensure that neck opening does not become too small
    if (neckotop < measurements.neck/4)
    {neckotop = measurements.neck/4,
     neckomid = (2*measurements.neck/4)/goldenRatio
    }
    if (neckomid < measurements.neck/4)
    {neckomid = measurements.neck/4,
     neckotop = ((measurements.neck/4)*goldenRatio)/2
    }


    points.neckotop = points.top.shift(0,-neckotop)
    points.neckomid = points.top.shift(-90,neckomid)

    
    paths.neck = new Path()
	.move(points.neckomid)
	.line(points.neckotop)

    let halvesseam = paths.seam.split(points.neckotop)
    paths.half = halvesseam[0]
    delete paths.half
    delete paths.seam

    paths.seam = paths.neck.join(halvesseam[1])
    
    let halvesmid = paths.fold.split(points.neckomid)
    paths.half = halvesmid[1]
    delete paths.half
    delete paths.fold
    paths.fold = halvesmid[0]

    }
	
        // Complete?
    if (complete) {


	// cut on fold	

	if (options.neckline === true){
	delete paths.cutonfold // delete inherited path from base
	macro('cutonfold', {
	    from: points.triangle,
	    to: points.neckomid,
	    grainline: true,
	})
	}
	    
	// logo & title
	points.logo = points.top.shift(45,points.bottom.dy(points.top)/5)
	snippets.logo = new Snippet("logo", points.logo)
	points.title = points.logo.shift(90, points.bottom.dy(points.top)/4)
	macro("title", {
	    at: points.title,
	    nr: 1,
	    title: "front"
	})
	points.__titleNr.attr('data-text-class', 'center')
	points.__titleName.attr('data-text-class', 'center')
	points.__titlePattern.attr('data-text-class', 'center')

	// scalebox
	points.scalebox = points.title.shift(90, points.bottom.dy(points.top)/5)
	macro("scalebox", { at: points.scalebox })

	if (sa) {
	    if (options.neckline === true){

		
	    delete paths.sa
	    paths.sa = paths.seam.offset(sa)
//		.join(paths.hem.offset(sa * 2.5))
		.close()
		.attr('class', 'fabric sa')

		paths.samod = new Path()
		    .move(points.bottom)
		    .line(points.top)
		    .setRender(false)
		
		let sasplit = paths.samod.intersects(paths.sa)
		points.sasplit2 = sasplit[0]

		//for (let p of sasplit){
		  //  let sahalves = paths.sa.split(p)
		    //paths.sa = sahalves[0]
		//}

		let sahalves = paths.sa.split(points.sasplit)
		paths.sa = sahalves[0]
		let sahalves2 = paths.sa.split(points.sasplit2)
		paths.sa = sahalves2[1]	   
		.close()
		.attr('class', 'fabric sa')



	    }
	}
	
	// Paperless?
	if (paperless) {
	    macro("ld", {
		from: points.neckotop,
		to: points.neckomid,
		d: 0
	});
	    macro("hd", {
		from: points.top,
		to: points.neckotop,
		d: 5
	});
	    macro("vd", {
		from: points.top,
		to: points.neckomid,
		d: 5
	});
	}
    }
    
        return part;
}
