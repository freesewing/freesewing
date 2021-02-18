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
  
    const cc = 0.551915024494; // circle constant
  
    let halfInch = store.get( 'halfInch' );
    let waist = store.get( 'waist' );

    let tempP;

    paths.waistSeam = paths.waistSeam.split( points.pocketFacingTL )[0]
      .setRender( false )

    paths.sideSeam = paths.sideSeam.split( points.pocketFacingBR )[1]
      .setRender( false )
      
    console.log('=============');
    paths.sideSeam.ops.forEach(op => {
      console.log( op );
    });
    console.log('=============');
  
    points.brCPtl = points.pocketFacingBR.shift( points.pocketFacingBR.angle( points.pocketSide ) +90, halfInch *3 )
    points.tlCPbr = points.pocketFacingTL.shift( points.pocketFacingTL.angle( points.pocketWaist ) -90, halfInch *6 )

    paths.facingInside = new Path()
      .move( points.pocketFacingTL )
      .curve( points.tlCPbr, points.brCPtl, points.pocketFacingBR )
      .setRender( false )

    paths.pocketFold = new Path()
      .move(points.pocketTL)
      .line(points.pocketBL)
      .attr('class', 'fabric dashed')
  
    points.pocketBLcpBR = points.pocketBL.shift( 0, points.pocketBL.dist( points.pocketFacingBR ) *.75 )
    points.pocketBRcpBL = points.pocketFacingBR.shift( 180, points.pocketBL.dist( points.pocketFacingBR ) *.35 )
    
    // Mirror a bunch of points
    points.mpocketBLcpBR = points.pocketBLcpBR.flipX( points.pocketTL )
    points.mpocketBRcpBL = points.pocketBRcpBL.flipX( points.pocketTL )
    points.mpocketFacingBR = points.pocketFacingBR.flipX( points.pocketTL )
    points.mpocketSide = points.pocketSide.flipX( points.pocketTL )
    points.mpocketWaist = points.pocketWaist.flipX( points.pocketTL )

    paths.pocketBottom = new Path()
      .move( points.mpocketFacingBR )
      .curve( points.mpocketBRcpBL, points.mpocketBLcpBR, points.pocketBL )
      .curve( points.pocketBLcpBR, points.pocketBRcpBL, points.pocketFacingBR )
      .attr('class', 'fabric')

    paths.seam = paths.waistSeam
      .line( points.mpocketWaist )
      .line( points.mpocketSide )
      .join( paths.pocketBottom )
      //.join( paths.facingInside )
      .join( paths.sideSeam )
      .close()
      .setRender( true )
      .attr('class', 'fabric')



    if( complete ) {
      snippets.n1 = new Snippet( 'notch', points.pocketWaist );
      snippets.n2 = new Snippet( 'notch', points.pocketSide );
      snippets.n3 = new Snippet( 'notch', points.mpocketWaist );
      snippets.n4 = new Snippet( 'notch', points.mpocketSide );
  
      points.logo = points.pocketSide.shiftFractionTowards( points.pocketTL, .50 );
      snippets.logo = new Snippet('logo', points.logo)
      points.title = points.logo.shift(270, 50)
      macro('title', {
        nr: 2,
        at: points.title,
        title: 'Pocket'
      })
      points.__titleNr.attr('data-text-class', 'center')
      points.__titleName.attr('data-text-class', 'center')
      points.__titlePattern.attr('data-text-class', 'center')
  
      if( sa ) {
        paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')
      }
    }
  
    // Paperless?
    if (paperless) {
      macro('hd', {
        from: points.pW,
        to: points.pU,
        y: points.pU.y +15
      })
      macro('hd', {
        from: points.pAextra,
        to: points.pR
      })
      macro('hd', {
        from: points.pK,
        to: points.pJ,
        y: points.pJ.y -15
      })
      // Keystone original (see above):
      // macro('hd', {
      //   from: points.pSlitBottom,
      //   to: points.pJ,
      //   y: points.pJ.y -30
      // })
      // macro('vd', {
      //   from: points.pSlitTop,
      //   to: points.pSlitBottom,
      //   x: points.pSlitTop.x +15
      // })
      macro('vd', {
        from: points.pW,
        to: points.pR,
        x: points.pR.x
      })
      macro('vd', {
        from: points.pR,
        to: points.pK,
        x: points.pR.x
      })
      macro('vd', {
        from: points.pW,
        to: points.pZ,
        x: points.pW.x +15
      })
      macro('vd', {
        from: points.pJ,
        to: points.pU,
        x: points.pU.x -15
      })
    }
  
    return part
  }
  