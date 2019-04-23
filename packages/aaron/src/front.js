import { dimensions } from './shared';

export default function(part) {
  // prettier-ignore
  let {utils, store, sa, Point, points, Path, paths, Snippet, snippets, options, measurements, complete, paperless, macro} = part.shorthand();

  // Hide Brian paths
  for(let key of Object.keys(paths)) paths[key].render = false;

  // Handle stretch
  for(let i in points) points[i].x = points[i].x * (1 - options.stretchFactor);

  // Rename cb (center back) to cf (center front)
  for (let key of ["Neck", "Shoulder", "Armhole", "Waist", "Hips", "Hem"]) {
    points[`cf${key}`] = new Point(
      points[`cb${key}`].x,
      points[`cb${key}`].y
    );
    //delete points[`cb${key}`];
  }

  // Neckline
  points.cfNeck = points.cfNeck.shift(-90, options.necklineDrop *
    (measurements.centerBackNeckToWaist + measurements.naturalWaistToHip)
  );

  // Strap
  points.strapCenter = points.neck.shiftFractionTowards(points.shoulder, options.shoulderStrapPlacement);
  points.strapLeft = points.strapCenter.shiftTowards(points.neck, points.neck.dist(points.shoulder) * options.shoulderStrapWidth);
  points.strapRight = points.strapLeft.rotate(180, points.strapCenter);
  points.necklineCorner = utils.beamsIntersect(
    points.strapLeft,
    points.strapRight.rotate(-90, points.strapLeft),
      points.cfNeck.shift(0, points.armholePitch.x/4),
      points.cfNeck
  );
  points.strapLeftCp2 = points.strapLeft.shiftFractionTowards(points.necklineCorner, options.necklineBend);
  points.cfNeckCp1 = points.cfNeck.shiftFractionTowards(points.necklineCorner, options.necklineBend);

  // Hips
  points.hips.x = (measurements.hipsCircumference + (options.hipsEase * measurements.hipsCircumference))/4 * (1 - options.stretchFactor);
  points.waist.x = points.hips.x; // Because stretch
  points.waistCp2 = points.waist.shift(90,points.armhole.dy(points.waist)/2);

  // Hem
  points.hem.x = points.hips.x;

  // Armhole drop
  let side = new Path()
    .move(points.hem)
    .line(points.waist)
    .curve(points.waistCp2, points.armhole, points.armhole);
  let split = side.intersectsY(points.armhole.y * (1 + options.armholeDrop)).pop();
  paths.side = side.split(split)[0];
  paths.side.render = false;
  points.aaronArmhole = split;

  // Armhole
  points.armholeCorner = utils.beamsIntersect(
    points.aaronArmhole,
    points.aaronArmhole.shift(180,10),
    points.strapRight,
    points.strapLeft.rotate(90, points.strapRight)
  );
  points.armholeCp2 = points.aaronArmhole.shiftFractionTowards(points.armholeCorner, 0.8);
  points.strapRightCp1 = points.strapRight.shiftFractionTowards(points.armholeCorner, 0.6);

  // Seamline
  paths.seam = new Path()
    .move(points.cfNeck)
    .line(points.cfHem)
    .line(points.hem)
    .line(points.waist)
    .join(paths.side)
    .curve(points.armholeCp2, points.strapRightCp1, points.strapRight)
    .line(points.strapLeft)
    .curve(points.strapLeftCp2, points.cfNeckCp1, points.cfNeck)
    .close()
    .attr("class", "fabric");

  // Store length of armhole and neck opening
  store.set(
    'frontArmholeLength',
    new Path()
      .move(points.aaronArmhole)
      .curve(points.armholeCp2, points.strapRightCp1, points.strapRight)
      .length()
  );
  store.set(
    'frontNeckOpeningLength',
    new Path()
      .move(points.strapLeft)
      .curve(points.cfNeckCp1, points.cfNeckCp1, points.cfNeck)
      .length()
  );

  // Complete pattern?
  if (complete) {
    macro("cutonfold", {
      from: points.cfNeck,
      to: points.cfHem,
      grainline: true
    });
    points.title = new Point(points.waist.x/2, points.waist.y);
    macro("title", { at: points.title, nr: 1, title: "front" });
    points.logo = points.title.shift(-90, 75);
    snippets.logo = new Snippet("logo", points.logo);

    if (sa) {
      paths.saShoulder = new Path()
        .move(points.strapRight)
        .line(points.strapLeft)
        .offset(sa)
        .line(points.strapLeft)
        .attr("class", "fabric sa");
      paths.saShoulder
        .move(points.strapRight)
        .line(paths.saShoulder.start());
      paths.saSide = paths.side
        .offset(sa)
        .line(points.aaronArmhole)
        .attr("class", "fabric sa");
      paths.saHem = new Path()
        .move(points.cfHem)
        .line(points.hem)
        .offset(sa * 2.5).attr("class", "fabric sa")
        .line(paths.saSide.start());
      paths.saHem
        .move(points.cfHem)
        .line(paths.saHem.start());
    }
  }

  // Paperless?
  if (paperless) {
    dimensions(macro, points, sa);
    macro("vd", {
      from: points.cfHem,
      to: points.cfNeck,
      x: points.cfHem.x - sa - 15
    });
  }

  return part;
};
