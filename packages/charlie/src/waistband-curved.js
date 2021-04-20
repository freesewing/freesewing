export default (part) => {
    // Shorthand
    let {
        measurements,
        points,
        Point,
        paths,
        Path,
        options,
        complete,
        paperless,
        store,
        macro,
        raise,
        snippets,
        Snippet,
        sa,
        units
    } = part.shorthand()

    if (options.waistbandCurve == 0) {
        return part;
    }

    const fullWaist = 2 * (store.get('waistbandBack') + store.get('waistbandFront'));
    const sideSeamFraction = 0.5 * store.get('waistbandFront') / (store.get('waistbandBack') + store.get('waistbandFront'))
    const radius = fullWaist / (2 * Math.PI * options.waistbandCurve);
    const angle = 360 * options.waistbandCurve;

    points.center = new Point(0, 0);

    points.cfLeftBottom = points.center.shift(0, radius);
    points.cbBottom = points.cfLeftBottom.rotate(0.5 * angle, points.center);
    points.cfRightBottom = points.cfLeftBottom.rotate(angle, points.center);

    points.cfLeftTop = points.cfLeftBottom.shiftTowards(points.center, options.waistbandWidth);
    points.cbTop = points.cfLeftTop.rotate(0.5 * angle, points.center);
    points.cfRightTop = points.cfRightBottom.shiftTowards(points.center, options.waistbandWidth);

    // Calculate control points for circle arc
    // https://math.stackexchange.com/questions/873224/calculate-control-points-of-cubic-bezier-curve-approximating-a-part-of-a-circle
    const a = (4 / 3) * Math.tan(2 * Math.PI * options.waistbandCurve / 4);

    points.cfLeftBottomCp = points.cfLeftBottom.shift(90, a * radius);
    points.cfRightBottomCp = points.cfRightBottom.shift(angle - 90, a * radius);

    points.cfLeftTopCp = points.cfLeftTop.shift(90, a * (radius - options.waistbandWidth))
    points.cfRightTopCp = points.cfRightTop.shift(angle - 90, a * (radius - options.waistbandWidth))

    // Add fly underlap
    points.edgeRightTop = points.cfRightTop.shiftTowards(points.cfRightTopCp, - store.get('waistbandFly'))
    points.edgeRightBottom = points.cfRightBottom.shiftTowards(points.cfRightBottomCp, - store.get('waistbandFly'))

    paths.waistbandTop = new Path()
        .move(points.cfRightTop)
        .curve(points.cfRightTopCp, points.cfLeftTopCp, points.cfLeftTop)
        .setRender(false)

    paths.waistbandBottom = new Path()
        .move(points.cfRightBottom)
        .curve(points.cfRightBottomCp, points.cfLeftBottomCp, points.cfLeftBottom)

    points.ssRightBottom = paths.waistbandBottom.shiftFractionAlong(sideSeamFraction);
    points.ssLeftBottom = paths.waistbandBottom.shiftFractionAlong(1 - sideSeamFraction);

    points.ssRightTop = paths.waistbandTop.shiftFractionAlong(sideSeamFraction);
    points.ssLeftTop = paths.waistbandTop.shiftFractionAlong(1 - sideSeamFraction);


    paths.saBase = new Path()
        .move(points.cfLeftBottom)
        .curve(points.cfLeftBottomCp, points.cfRightBottomCp, points.cfRightBottom)
        .line(points.edgeRightBottom)
        .line(points.edgeRightTop)
        .line(points.cfRightTop)
        .curve(points.cfRightTopCp, points.cfLeftTopCp, points.cfLeftTop)
        .close()
        .setRender(false)
    paths.seam = paths.saBase.clone().attr('class', 'fabric').setRender(true)

    if (complete) {
        raise.info(
            `Top of waistband: ${units(paths.waistbandTop.length())}`
        )
        macro('sprinkle', {
            snippet: 'notch',
            on: ['cfRightBottom', 'cfRightTop', 'cbBottom', 'cbTop', 'ssLeftBottom', 'ssRightBottom', 'ssLeftTop', 'ssRightTop']
        })

        points.titleAnchor = points.cfLeftBottom.shiftFractionTowards(points.ssLeftTop, 0.4)
        macro('title', {
            at: points.titleAnchor,
            nr: 11,
            title: 'waistband',
            rotation: -90
        })

        macro('grainline', {
            from: points.cbTop,
            to: points.cbBottom
        })

        paths.cf = new Path()
            .move(points.cfRightTop)
            .line(points.cfRightBottom)
            .attr('class', 'dashed')
            .attr('data-text', 'centerFront')
            .attr('data-text-class', 'center')
        paths.rs = new Path()
            .move(points.ssRightTop)
            .line(points.ssRightBottom)
            .attr('class', 'dashed')
            .attr('data-text', 'rightSide')
            .attr('data-text-class', 'center')
        paths.ls = new Path()
            .move(points.ssLeftTop)
            .line(points.ssLeftBottom)
            .attr('class', 'dashed')
            .attr('data-text', 'leftSide')
            .attr('data-text-class', 'center')
        if (sa) {

        }

        if (paperless) {

        }
    }

    return part
}
