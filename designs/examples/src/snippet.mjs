import { box } from './shared.mjs'

export const snippet = {
  name: 'examples.snippet',
  draft: ({ Point, points, Snippet, snippets, part }) => {
    points.anchor1 = new Point(20, 15)
    points.anchor2 = new Point(50, 15)
    points.anchor3 = new Point(80, 15)
    snippets.demo1 = new Snippet('button', points.anchor1)
    snippets.demo2 = new Snippet('buttonhole', points.anchor2)
    snippets.demo3 = new Snippet('logo', points.anchor3).attr('data-scale', 0.5)

    return box(part)
  },
}

export const snippet_attr = {
  name: 'examples.snippet_attr',
  draft: ({ Point, points, Snippet, snippets, part }) => {
    points.anchor = new Point(50, 15)
    snippets.demo = new Snippet('logo', points.anchor)
      .attr('data-scale', 0.8)
      .attr('data-rotate', 180)

    return box(part)
  },
}

export const snippet_clone = {
  name: 'examples.snippet_clone',
  draft: ({ Point, points, Snippet, snippets, part }) => {
    points.anchor = new Point(35, 35)
    snippets.demo = new Snippet('logo', points.anchor).attr('style', 'color: #f006')

    snippets.clone = snippets.demo.clone().attr('data-scale', 0.5)

    return box(part)
  },
}
