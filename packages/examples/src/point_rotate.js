export default part => {
  let { Point, points, Path, paths, Snippet, snippets } = part.shorthand();

  points.sun = new Point(40, 40);
  snippets.sun = new Snippet("notch", points.sun);
  points.moon = new Point(70, 40);
  let angle = 0;
  let step = 360 / 36;
  for (let i = 1; i < 37; i++) {
    let angle = step * i;
    points[`moon${i}`] = points.moon.rotate(angle, points.sun);
    paths[`moon${i}`] = new Path().move(points.sun).line(points[`moon${i}`]);
    snippets[`moon${i}`] = new Snippet("x", points[`moon${i}`]);
  }

  return part;
};
