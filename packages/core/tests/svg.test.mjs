import chai from 'chai'
import chaiString from 'chai-string'
import { Svg } from '../src/svg.mjs'
import { Design, Attributes } from '../src/index.mjs'
import { Defs } from '../src/defs.mjs'
import { version } from '../data.mjs'
import render from './fixtures/render.mjs'

chai.use(chaiString)
const expect = chai.expect

const getPattern = (settings = {}, draft = false) => {
  const part = {
    name: 'test',
    draft: draft
      ? draft
      : ({ paths, Path, Point, part }) => {
          paths.test = new Path()
            .move(new Point(0, 0))
            .line(new Point(40, 20))
            .curve(new Point(12, 34), new Point(56, 78), new Point(21, 32))
            .close()
            .attr('id', 'something')
            .attr('class', 'freesewing')
          return part
        },
  }
  const Pattern = new Design({ parts: [part] })

  return new Pattern(settings)
}

const trim = (svg) =>
  svg
    .split('\n')
    .map((line) => line.trim())
    .join('')

describe('Svg', () => {
  it('Svg constructor should initialize object', () => {
    const svg = new Svg()
    expect(svg.attributes instanceof Attributes).to.equal(true)
    expect(svg.freeId).to.equal(0)
    expect(svg.body).to.equal('')
    expect(svg.style).to.equal('')
    expect(svg.defs).to.be.an.instanceof(Defs)
    expect(svg.prefix).to.equal('<?xml version="1.0" encoding="UTF-8" standalone="no"?>')
    expect(svg.attributes.get('xmlns')).to.equal('http://www.w3.org/2000/svg')
    expect(svg.attributes.get('xmlns:svg')).to.equal('http://www.w3.org/2000/svg')
    expect(svg.attributes.get('xmlns:xlink')).to.equal('http://www.w3.org/1999/xlink')
    expect(svg.attributes.get('xmlns:freesewing')).to.equal(
      'http://freesewing.org/namespaces/freesewing'
    )
    expect(svg.attributes.get('freesewing')).to.equal(version)
  })

  it('Svg constructor should use the object we pass it as pattern', () => {
    const obj = {}
    const svg = new Svg(obj)
    expect(svg.pattern).to.eql(obj)
  })

  it('Should render a pattern as SVG', () => {
    const pattern = getPattern()
    const svg = pattern.draft().render()
    expect(trim(svg)).to.equalIgnoreSpaces(render.boilerplate)
  })

  it('Should render the SVG language attribute', () => {
    const pattern = getPattern({ locale: 'nl' })
    const svg = pattern.draft().render()
    expect(svg).to.equalIgnoreSpaces(render.boilerplateNl)
  })

  it('Should render the SVG viewBox attribute for embedding', () => {
    const pattern = getPattern({ embed: true })
    const svg = pattern.draft().render()
    expect(trim(svg)).to.equalIgnoreSpaces(render.embed)
  })

  it('Should render a stack as SVG', () => {
    const pattern = getPattern()
    pattern.draft().render()
    const svg = pattern.svg.__renderStack(pattern.stacks.test)
    expect(trim(svg)).to.equalIgnoreSpaces(render.part)
  })

  it('Should render a part as SVG', () => {
    const pattern = getPattern()
    pattern.draft().render()
    const svg = pattern.svg.__renderPart(pattern.parts[0].test)
    expect(trim(svg)).to.equalIgnoreSpaces(render.part)
  })

  it('Should render a path as SVG', () => {
    const pattern = getPattern()
    pattern.draft().render()
    const svg = pattern.svg.__renderPath(pattern.parts[0].test.paths.test)
    expect(trim(svg)).to.equalIgnoreSpaces(render.path)
  })

  it('Should render Svg text', () => {
    const pattern = getPattern({}, ({ points, Point, part }) => {
      points.test = new Point(20, 20)
        .attr('data-text', 'This is a test')
        .attr('data-text-class', 'text-lg')
      points.other = new Point(10, 10).attr('data-text', '')

      return part
    })
    pattern.draft().render()
    const svg = pattern.svg.__renderPart(pattern.parts[0].test)
    expect(trim(svg)).to.equalIgnoreSpaces(render.text)
  })

  it('Should render Svg multi-line text', () => {
    const pattern = getPattern({}, ({ points, Point, part }) => {
      points.test = new Point(20, 20)
        .attr('data-text', 'This is a test\nwith text on\nmultiple lines')
        .attr('data-text-class', 'text-lg')
        .attr('data-text-lineheight', 8)

      return part
    })
    pattern.draft().render()
    const svg = pattern.svg.__renderPart(pattern.parts[0].test)
    expect(trim(svg)).to.equalIgnoreSpaces(render.multiText)
  })

  it('Should render Svg multi-line text with default lineheight', () => {
    const pattern = getPattern({}, ({ points, Point, part }) => {
      points.test = new Point(20, 20)
        .attr('data-text', 'This is a test\nwith text on\nmultiple lines')
        .attr('data-text-class', 'text-lg')

      return part
    })
    pattern.draft().render()
    const svg = pattern.svg.__renderPart(pattern.parts[0].test)
    expect(trim(svg)).to.equalIgnoreSpaces(render.multiTextDflt)
  })

  it('Should render Svg text on path', () => {
    const pattern = getPattern({}, ({ paths, Path, Point, part }) => {
      paths.test = new Path()
        .move(new Point(0, 0))
        .line(new Point(40, 20))
        .curve(new Point(12, 34), new Point(56, 78), new Point(21, 32))
        .close()
        .attr('data-text', 'This is another test')
        .attr('data-text-class', 'text-sm')
        .attr('class', 'freesewing')

      return part
    })
    pattern.draft().render()
    const svg = pattern.svg.__renderPart(pattern.parts[0].test)
    expect(trim(svg)).to.equalIgnoreSpaces(render.textOnPath)
  })

  it('Should render Svg text on path, center aligned', () => {
    const pattern = getPattern({}, ({ paths, Path, part }) => {
      paths.test = new Path()
        .attr('data-text', 'This is another test')
        .attr('data-text-class', 'center')
        .attr('class', 'freesewing')

      return part
    })
    pattern.draft().render()
    const svg = pattern.svg.__renderPart(pattern.parts[0].test)
    expect(trim(svg)).to.equalIgnoreSpaces(render.textOnPathCenter)
  })

  it('Should render Svg text on path, right aligned', () => {
    const pattern = getPattern({}, ({ paths, Path, part }) => {
      paths.test = new Path()
        .attr('data-text', 'This is another test')
        .attr('data-text-class', 'right')
        .attr('class', 'freesewing')

      return part
    })
    pattern.draft().render()
    const svg = pattern.svg.__renderPart(pattern.parts[0].test)
    expect(trim(svg)).to.equalIgnoreSpaces(render.textOnPathRight)
  })

  it('Should render an Svg circle', () => {
    const pattern = getPattern({}, ({ points, Point, part }) => {
      points.test = new Point(20, 20).attr('data-circle', '50')

      return part
    })
    pattern.draft().render()
    const svg = pattern.svg.__renderPart(pattern.parts[0].test)
    expect(trim(svg)).to.equalIgnoreSpaces(render.circle)
  })

  it('Should render an Svg snippet', () => {
    const pattern = getPattern({}, ({ snippets, Snippet, Point, part }) => {
      snippets.test = new Snippet('test', new Point(20, 20), 'This is a snippet')

      return part
    })
    pattern.draft().render()
    const svg = pattern.svg.__renderPart(pattern.parts[0].test)
    expect(trim(svg)).to.equalIgnoreSpaces(render.snippet)
  })

  it('Should render a rotated Svg snippet', () => {
    const pattern = getPattern({}, ({ snippets, Snippet, Point, part }) => {
      snippets.test = new Snippet('test', new Point(20, 20), 'This is a snippet').attr(
        'data-rotate',
        90
      )

      return part
    })
    pattern.draft().render()
    const svg = pattern.svg.__renderPart(pattern.parts[0].test)
    expect(trim(svg)).to.equalIgnoreSpaces(render.rotatedSnippet)
  })

  it('Should replaced double quotes in Svg text', () => {
    const svg = new Svg()
    expect(svg.__escapeText('This is a "test" message')).to.equal(
      'This is a &#8220;test&#8220; message'
    )
  })

  it('Should scale an Svg snippet', () => {
    const pattern = getPattern({}, ({ snippets, Snippet, Point, part }) => {
      snippets.test = new Snippet('test', new Point(20, 20), 'This is a snippet').attr(
        'data-scale',
        2
      )

      return part
    })
    pattern.draft().render()
    const svg = pattern.svg.__renderPart(pattern.parts[0].test)
    expect(trim(svg)).to.equalIgnoreSpaces(render.scaledSnippet)
  })

  it('Should run preRender hook', () => {
    const pattern = getPattern()
    pattern.on('preRender', (svg) => {
      svg.attributes.set('data-hook', 'preRender')
    })
    pattern.draft().render()
    expect(pattern.svg.attributes.get('data-hook')).to.equal('preRender')
  })

  it('Should run insertText hook', () => {
    const pattern = getPattern({}, ({ points, Point, part }) => {
      points.test = new Point(20, 20)
        .attr('data-text', 'This is a test')
        .attr('data-text-class', 'text-lg')

      return part
    })
    pattern.on('insertText', (locale, text) => {
      return text.toUpperCase()
    })
    pattern.draft()
    expect(pattern.render()).to.contain('THIS IS A TEST')
  })

  it('Should run postRender hook', () => {
    const pattern = getPattern()
    pattern.on('postRender', (svg) => {
      svg.svg = 'test'
    })
    expect(pattern.draft().render()).to.equal('test')
  })

  it('Should tab in and out', () => {
    const svg = new Svg()
    svg.tabs = 2
    expect(svg.__tab()).to.equal('    ')
  })
})
