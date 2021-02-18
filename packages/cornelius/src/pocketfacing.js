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
      
  
    points.brCPtl = points.pocketFacingBR.shift( points.pocketFacingBR.angle( points.pocketSide ) +90, halfInch *3 )
    points.tlCPbr = points.pocketFacingTL.shift( points.pocketFacingTL.angle( points.pocketWaist ) -90, halfInch *6 )

    paths.facingInside = new Path()
      .move( points.pocketFacingTL )
      .curve( points.tlCPbr, points.brCPtl, points.pocketFacingBR )
      .setRender( false )

    paths.seam = paths.waistSeam
      .join( paths.facingInside )
      .join( paths.sideSeam )
      .close()
      .setRender( true )
      .attr('class', 'fabric')



    if( complete ) {
      snippets.n1 = new Snippet( 'notch', points.pocketWaist );
      snippets.n2 = new Snippet( 'notch', points.pocketSide );
  
      points.logo = points.pUcpA.shiftFractionTowards( points.pocketFacingTL, .50 ).shift(270, 30);
      snippets.logo = new Snippet('logo', points.logo)
      points.title = points.logo.shift(270, 50)
      macro('title', {
        nr: 3,
        at: points.title,
        title: 'PocketFacing'
      })
    //   points.__titleNr.attr('data-text-class', 'center')
    //   points.__titleName.attr('data-text-class', 'center')
    //   points.__titlePattern.attr('data-text-class', 'center')
  
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
  