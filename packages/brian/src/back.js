import F from 'freesewing'
import base from './base';

var back =
{
  draft: function(part, context, final = true)
  {
    let { measurements, options, points, paths, snippets } = F.utils.shorthand(part, context);

    base.draft(part, context);

    paths.seam = new F.path()
      .move(points.cbNeck)
      .line(points.cbHips)
      .line(points.hips)
      .line(points.armhole)
      .curve(points.armholeCp1, points.armholeCp2, points.armholeHollow)
      .curve(points.armholeHollowCp1, points.armholeHollowCp2, points.armholePitch)
      .curve(points.armholePitchCp1, points.armholePitchCp2, points.shoulder)
      .line(points.neck)
      .curve(points.neckCp1, points.cbNeck, points.cbNeck)
      .close()
    ;
  }
}

export default back;
