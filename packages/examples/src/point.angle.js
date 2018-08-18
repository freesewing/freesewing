import freesewing from "freesewing";

var pointAngle = {
  draft: function(part) {
    // prettier-ignore
    let {Point, points, Path, paths, Snippet, snippets} = part.shorthand();

    points.sun = new Point(40, 40);
    points.moon1 = new Point(70, 40).attr('data-text', '0').attr('data-text-class', 'text-xl');
    points.moon2 = new Point(40, 10).attr('data-text', 90).attr('data-text-class', 'text-xl');
    points.moon3 = new Point(10, 40).attr('data-text', 180).attr('data-text-class', 'text-xl');
    points.moon4 = new Point(40, 70).attr('data-text', 270).attr('data-text-class', 'text-xl');
    points.moon5 = points.moon1.rotate(-45, points.sun);
    points.moon5.attr('data-text', points.sun.angle(points.moon5)).attr('data-text-class', 'text-xl');

    paths.moon1 = new Path().move(points.sun).line(points.moon1).attr('class', 'dashed note');
    paths.moon2 = new Path().move(points.sun).line(points.moon2).attr('class', 'dashed note');
    paths.moon3 = new Path().move(points.sun).line(points.moon3).attr('class', 'dashed note');
    paths.moon4 = new Path().move(points.sun).line(points.moon4).attr('class', 'dashed note');
    paths.moon5 = new Path().move(points.sun).line(points.moon5).attr('class', 'dashed note');

    snippets.notch = new Snippet("notch", points.sun);
    snippets.notch1 = new Snippet("x", points.moon1);
    snippets.notch2 = new Snippet("x", points.moon2);
    snippets.notch3 = new Snippet("x", points.moon3);
    snippets.notch4 = new Snippet("x", points.moon4);
    snippets.notch5 = new Snippet("x", points.moon5);

    return part;
  }
};

export default pointAngle;
