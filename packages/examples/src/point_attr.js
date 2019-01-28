import { box } from "./shared";

export default part => {
  let { Point, points, Snippet, snippets } = part.shorthand();

  points.anchor = new Point(50, 25)
    .attr("data-text", "msg")
    .attr("data-text-class", "text-xl center")
    .attr("data-text-lineheight", 10);

  return box(part);
};
