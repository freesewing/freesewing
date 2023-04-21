import chai from 'chai'
import { Design } from '@freesewing/core'
import { annotationsPlugin } from '../src/index.mjs'

const expect = chai.expect

const Pattern = new Design()
const pattern = new Pattern().use(annotationsPlugin)
pattern.draft().render()

describe('Buttons Plugin Test', () => {
  for (const snippet of ['button', 'buttonhole', 'snap-stud', 'snap-socket']) {
    it(`Should add the ${snippet} snippet to defs`, () => {
      expect(pattern.svg.defs.get(snippet)).to.not.equal(false)
    })
  }

  it('Draws a button on an anchor point', () => {
    const part = {
      name: 'test',
      draft: ({ points, Point, snippets, Snippet, part }) => {
        points.anchor = new Point(10, 20)
        snippets.button = new Snippet('button', points.anchor)

        return part
      },
      plugins: [annotationsPlugin],
    }
    const Pattern = new Design({ parts: [part] })
    const svg = new Pattern().draft().render()
    expect(svg).to.contain('<use x="10" y="20" xlink:href="#button"')
  })

  it('Draws a buttonhole centred on an anchor point', () => {
    const part = {
      name: 'test',
      draft: ({ points, Point, snippets, Snippet, part }) => {
        points.anchor = new Point(10, 20)
        snippets.button = new Snippet('buttonhole', points.anchor)

        return part
      },
      plugins: [annotationsPlugin],
    }
    const Pattern = new Design({ parts: [part] })
    const svg = new Pattern().draft().render()
    expect(svg).to.contain('<use x="10" y="20" xlink:href="#buttonhole"')
  })

  it('Draws a buttonhole starting on an anchor point', () => {
    const part = {
      name: 'test',
      draft: ({ points, Point, snippets, Snippet, part }) => {
        points.anchor = new Point(10, 20)
        snippets.button = new Snippet('buttonhole-start', points.anchor)

        return part
      },
      plugins: [annotationsPlugin],
    }
    const Pattern = new Design({ parts: [part] })
    const svg = new Pattern().draft().render()
    expect(svg).to.contain('<use x="10" y="20" xlink:href="#buttonhole-start"')
  })

  it('Draws a buttonhole ending on an anchor point', () => {
    const part = {
      name: 'test',
      draft: ({ points, Point, snippets, Snippet, part }) => {
        points.anchor = new Point(10, 20)
        snippets.button = new Snippet('buttonhole-end', points.anchor)

        return part
      },
      plugins: [annotationsPlugin],
    }
    const Pattern = new Design({ parts: [part] })
    const svg = new Pattern().draft().render()
    expect(svg).to.contain('<use x="10" y="20" xlink:href="#buttonhole-end"')
  })

  it('Draws a snap-stud on an anchor point', () => {
    const part = {
      name: 'test',
      draft: ({ points, Point, snippets, Snippet, part }) => {
        points.anchor = new Point(10, 20)
        snippets.button = new Snippet('snap-stud', points.anchor)

        return part
      },
      plugins: [annotationsPlugin],
    }
    const Pattern = new Design({ parts: [part] })
    const svg = new Pattern().draft().render()
    expect(svg).to.contain('<use x="10" y="20" xlink:href="#snap-stud"')
  })

  it('Draws a snap-socket on an anchor point', () => {
    const part = {
      name: 'test',
      draft: ({ points, Point, snippets, Snippet, part }) => {
        points.anchor = new Point(10, 20)
        snippets.button = new Snippet('snap-socket', points.anchor)

        return part
      },
      plugins: [annotationsPlugin],
    }
    const Pattern = new Design({ parts: [part] })
    const svg = new Pattern().draft().render()
    expect(svg).to.contain('<use x="10" y="20" xlink:href="#snap-socket"')
  })
})
