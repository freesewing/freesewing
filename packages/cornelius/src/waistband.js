export default function (part) {
  let {
    options,
    measurements,
    Point,
    Path,
    points,
    paths,
    Snippet,
    snippets,
    complete,
    sa,
    store,
    paperless,
    macro
  } = part.shorthand()

  let halfInch = store.get( 'halfInch' );
  let waistLength = store.get( 'frontWaistLength' ) +store.get( 'backWaistLength' );

  points.pA = new Point( 0, 0 );
  points.pB = points.pA.shift( 270, waistLength );
  points.pC = points.pB.shift( 180, halfInch *3.5 );
  points.pD = points.pA.shift( 180, halfInch *3.5 );
  points.pAout = points.pA.shift( 90, halfInch *2 );
  points.pDout = points.pD.shift( 90, halfInch *2 );

  paths.seam = new Path()
    .move( points.pB )
    .line( points.pAout )
    .line( points.pDout )
    .line( points.pC )
    .attr('class', 'fabric');

  paths.seam2 = new Path()
    .move( points.pC )
    .line( points.pB )
    .attr('class', 'fabric');
  
    // paths.seamTotal = paths.seam.line( points.pB ).close().attr('class', 'fabric');

  if( complete ) {
    points.button = points.pA.shift(90,halfInch).shift(180, halfInch *1.75);

    snippets.bh = new Snippet( 'buttonhole', points.button );
    snippets.b = new Snippet( 'button', points.button );

    snippets.n1 = new Snippet( 'notch', points.pA.shift(270, store.get( 'frontWaistLength' ) ) );
    snippets.n2 = new Snippet( 'bnotch', points.pA.shift(270, store.get( 'frontWaistLength' ) +halfInch *2 ) );
  
    macro('cutonfold', {
      from: points.pC,
      to: points.pB
    });

    points.logo = points.pA.shiftFractionTowards( points.pC, .50 );
    console.log( points.logo );
    snippets.logo = new Snippet( 'logo', points.logo );
    points.title = points.logo.shift(90, 70)
    macro('title', {
      nr: 1,
      at: points.title,
      title: 'WaistBand'
    })
    points.__titleNr.attr('data-text-class', 'center')
    points.__titleName.attr('data-text-class', 'center')
    points.__titlePattern.attr('data-text-class', 'center')

    if( sa ) {
      paths.sa = new Path()
        .move( points.pC )
        .line( points.pC.shift( 180, sa ) )
        .join( paths.seam.offset(sa) )
        .line( points.pB )
        .attr('class', 'fabric sa')
    }
  }

  // Paperless?
  if (paperless) {
    macro('hd', {
      from: points.pDout,
      to: points.pAout,
      y: points.pA.y -sa -15
    })
    macro('vd', {
      from: points.pDout,
      to: points.pC,
      x: points.pC.x -sa -15
    })
  }
  
  return part;
}
