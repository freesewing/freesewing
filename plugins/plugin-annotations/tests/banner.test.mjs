import chai from 'chai'
import { Design } from '@freesewing/core'
import { annotationsPlugin } from '../src/index.mjs'

const expect = chai.expect

describe('Banner Plugin Tests', () => {
  it('Should add repeating text to a path', () => {
    const part = {
      name: 'test',
      draft: ({ Point, points, Path, paths, macro, part }) => {
        points.from = new Point(30, 30)
        points.to = new Point(30, 100)
        paths.example = new Path().move(points.from).line(points.to)

        macro('banner', {
          text: 'foo',
          path: paths.example,
        })

        return part
      },
      plugins: [annotationsPlugin],
    }
    // Note that we're not loading core plugins but the local plugin
    const design = new Design({ parts: [part], noCorePlugins: true })
    const pattern = new design()
    pattern.draft()
    // Note that this macro does not add text to the path, but clones
    // the path and adds text to the clone which is then hidden
    const c = pattern.parts[0].test.paths.__macro_banner_banner_banner
    expect(c.attributes.get('data-text')).to.equal(
      'foo &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; foo &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; foo &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; foo &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; foo &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; foo &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; foo &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; foo &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; foo &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; foo &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; foo'
    )
    expect(c.attributes.get('data-text-class').trim()).to.equal('center')
    expect(c.attributes.get('data-text-dy')).to.equal('-1')
  })

  it('Number of spaces should be configurable', () => {
    const part = {
      name: 'test',
      draft: ({ Point, points, Path, paths, macro, part }) => {
        points.from = new Point(30, 30)
        points.to = new Point(30, 100)
        paths.example2 = new Path().move(points.from).line(points.to)

        macro('banner', {
          text: 'foo',
          path: paths.example2,
          spaces: 2,
          repeat: 2,
        })

        return part
      },
      plugins: [annotationsPlugin],
    }
    // Note that we're not loading core plugins but the local plugin
    const design = new Design({ parts: [part], noCorePlugins: true })
    const pattern = new design()
    pattern.draft()
    const c = pattern.parts[0].test.paths.__macro_banner_banner_banner
    expect(c.attributes.get('data-text')).to.equal('foo &#160;&#160; foo &#160;&#160; foo')
  })

  it('Number of repetitions should be configurable', () => {
    const part = {
      name: 'test',
      draft: ({ Point, points, Path, paths, macro, part }) => {
        points.from = new Point(30, 30)
        points.to = new Point(30, 100)
        paths.example3 = new Path().move(points.from).line(points.to)

        macro('banner', {
          text: 'foo',
          path: paths.example3,
          spaces: 1,
          repeat: 4,
        })

        return part
      },
      plugins: [annotationsPlugin],
    }
    // Note that we're not loading core plugins but the local plugin
    const design = new Design({ parts: [part], noCorePlugins: true })
    const pattern = new design()
    pattern.draft()
    const c = pattern.parts[0].test.paths.__macro_banner_banner_banner
    expect(c.attributes.get('data-text')).to.equal(
      'foo &#160; foo &#160; foo &#160; foo &#160; foo'
    )
  })
})
