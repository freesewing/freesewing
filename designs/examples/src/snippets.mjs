import { box } from './shared.mjs'

export const snippet_bnotch = {
  name: 'examples.snippet_bnotch',
  draft: part => {
    const { Point, points, Snippet, snippets } = part.shorthand()

    points.anchor = new Point(50, 5)
    snippets.demo = new Snippet('bnotch', points.anchor)

    return box(part, 100, 10)
  }
}

export const snippet_button  = {
  name: 'examples.snippet_button',
  draft: part => {
    const { Point, points, Snippet, snippets } = part.shorthand()

    points.anchor = new Point(50, 5)
    snippets.demo = new Snippet('button', points.anchor)

    return box(part, 100, 10)
  }
}

export const snippet_buttonholeend = {
  name: 'examples.snippet_buttonholeend',
  draft: part => {
    const { Point, points, Snippet, snippets } = part.shorthand()

    points.anchor = new Point(50, 0)
    snippets.demo = new Snippet('buttonhole-end', points.anchor)

    return box(part, 100, 10)
  }
}

export const snippet_buttonholestart = {
  name: 'examples.snippet_buttonholestart',
  draft: part => {
    const { Point, points, Snippet, snippets } = part.shorthand()

    points.anchor = new Point(50, 10)
    snippets.demo = new Snippet('buttonhole-start', points.anchor)

    return box(part, 100, 10)
  }
}

export const snippet_buttonhole = {
  name: 'examples.snippet_buttonhole',
  draft: part => {
    const { Point, points, Snippet, snippets } = part.shorthand()

    points.anchor = new Point(50, 5)
    snippets.demo = new Snippet('buttonhole', points.anchor)

    return box(part, 100, 10)
  }
}

export const snippet_logo = {
  name: 'examples.snippet_logo',
  draft: part => {
    const { Point, points, Snippet, snippets } = part.shorthand()

    points.anchor = new Point(50, 35)
    snippets.demo = new Snippet('logo', points.anchor)

    return box(part, 100, 50)
  }
}

export const snippet_notch = {
  name: 'examples.snippet_notch',
  draft: part => {
    const { Point, points, Snippet, snippets } = part.shorthand()

    points.anchor = new Point(50, 5)
    snippets.demo = new Snippet('notch', points.anchor)

    return box(part, 100, 10)
  }
}

export const snippet_snapsocket = {
  name: 'examples.snippet_snapsocket',
  draft: part => {
    const { Point, points, Snippet, snippets } = part.shorthand()

    points.anchor = new Point(50, 5)
    snippets.demo = new Snippet('snap-socket', points.anchor)

    return box(part, 100, 10)
  }
}

export const snippet_snapstud = {
  name: 'examples.snippet_snapstud',
  draft: part => {
    const { Point, points, Snippet, snippets } = part.shorthand()

    points.anchor = new Point(50, 5)
    snippets.demo = new Snippet('snap-stud', points.anchor)

    return box(part, 100, 10)
  }
}

