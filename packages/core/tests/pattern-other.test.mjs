import chai from 'chai'
import { Design } from '../src/index.mjs'

const expect = chai.expect

describe('Pattern', () => {

  it('Should log an error when a part does not have a name', () => {
    const part = { draft: ({ part }) => part }
    const design = new Design()
    const pattern = new design()
    pattern.addPart(part)
    expect(pattern.stores[0].logs.error.length).to.equal(1)
    expect(pattern.stores[0].logs.error[0]).to.equal('Part must have a name')
  })

  it('Should log an error when a part does not have a draft method', () => {
    const from = {
      name: 'test',
      draft: ({ points, part }) => {
        points.test = false
        return part
      }
    }
    const to = {
      name: 'testTo',
      from,
      draft: ({ points, part }) => {
        return part
      }
    }
    const design = new Design({ parts: [ to ]})
    const pattern = new design()
    pattern.draft()
    expect(pattern.stores[0].logs.error.length).to.equal(2)
    expect(pattern.stores[0].logs.error[0][0]).to.equal('Unable to draft part `test` (set 0)')
    expect(pattern.stores[0].logs.error[1][0]).to.equal('Could not inject part `test` into part `testTo`')
  })

  it('Not returning the part from the draft method should log an error', () => {
    const test = {
      name: 'test',
      draft: ({ points, part }) => {}
    }
    const design = new Design({ parts: [ test ]})
    const pattern = new design()
    pattern.draft()
    expect(pattern.stores[0].logs.error.length).to.equal(1)
    expect(pattern.stores[0].logs.error[0]).to.equal('Result of drafting part test was undefined. Did you forget to return the part?')
  })

  it('Should skip unneeded parts', () => {
    const test = {
      name: 'test',
      draft: ({ points, part }) => part
    }
    const design = new Design({ parts: [ test ]})
    const pattern = new design({ only: ['you'] })
    pattern.draft()
    expect(pattern.stores[0].logs.debug.length).to.equal(3)
    expect(pattern.stores[0].logs.debug[2]).to.equal('Part `test` is not needed. Skipping draft and setting hidden to `true`')
  })

  it('Should return the initialized config', () => {
    const test = {
      name: 'test',
      draft: ({ points, part }) => part
    }
    const design = new Design({ parts: [ test ]})
    const pattern = new design({ only: ['you'] })
    const config = pattern.getConfig()
    expect(config.parts[0]).to.equal(test)
  })

  it('Should skip a plugin that is loaded twice', () => {
    const test = {
      name: 'test',
      draft: ({ points, part }) => part
    }
    const plugin = { name: 'test' }
    const design = new Design({ parts: [ test ]})
    const pattern = new design({ only: ['you'] })
    pattern.use(plugin)
    pattern.use(plugin)
    pattern.use({ plugin })
    pattern.use({ plugin })
    expect(pattern.stores[0].logs.info[1]).to.equal("Plugin `test` was requested, but it's already loaded. Skipping.")
    expect(pattern.stores[0].logs.info[3]).to.equal("Plugin `test` was requested, but it's already loaded. Skipping.")
  })

  it('Should log an error of added parts do not have a draft method', () => {
    const design = new Design()
    const pattern = new design()
    pattern.addPart({})
    expect(pattern.stores[0].logs.error.length).to.equal(1)
    expect(pattern.stores[0].logs.error[0]).to.equal('Part must have a draft() method')
  })

  it('Parts in only are never hidden', () => {
    const test = {
      name: 'test',
      hidden: true,
      draft: ({ points, part }) => part
    }
    const design = new Design()
    const pattern = new design({ only: ['test']})
    pattern.__init()
    expect(pattern.__isPartHidden('test')).to.equal(false)
  })

  it('Stacks with parts in only are never hidden', () => {
    const part = {
      name: 'test',
      draft: ({ points, Point, paths, Path, part }) => {
        points.test = new Point(3, 3)

        return part
      },
    }
    const design = new Design({ parts: [part] })
    const pattern = new design({ only: [ 'test' ] })
    pattern.draft().render()
    expect(pattern.__isStackHidden('test')).to.equal(false)
  })

  it('Stacks with parts in only are never hidden', () => {
    const part = {
      name: 'test',
      draft: ({ points, Point, paths, Path, part }) => {
        points.test = new Point(3, 3)

        return part
      },
    }
    const design = new Design({ parts: [part] })
    const pattern = new design({ only: [ 'test' ] })
    pattern.draft().render()
    expect(pattern.__isStackHidden('test')).to.equal(false)
  })

  it('Stacks with hidden dependencies should set hidden', () => {
    const part1 = {
      name: 'test1',
      draft: ({ points, Point, paths, Path, part }) => {
        points.test = new Point(3, 3)

        return part
      },
    }
    const part2 = {
      name: 'test2',
      from: part1,
      hideDependencies: true,
      draft: ({ points, Point, paths, Path, part }) => {
        points.test = new Point(3, 3)

        return part
      },
    }
    const design = new Design({ parts: [part2] })
    const pattern = new design()
    const config = pattern.getConfig()
    expect(config.parts[1].hideAll).to.equal(true)
  })

  it('Drafts with errors should not get packed', () => {
    const part= {
      name: 'test',
      draft: ({ points, Point, paths, Path, part }) => {
        points.test = new Point(3, 3)
        joints.foo = 'bar'

        return part
      },
    }
    const design = new Design({ parts: [part] })
    const pattern = new design()
    pattern.draft().render()
    expect(pattern.stores[0].logs.error.length).to.equal(1)
    expect(pattern.stores[0].logs.error[0][0]).to.equal('Unable to draft part `test` (set 0)')
  })

  it('Handle layout object', () => {
    const part = {
      name: 'test',
      draft: ({ points, Point, paths, Path, part }) => {
        points.test = new Point(3, 3)

        return part
      },
    }
    const design = new Design({ parts: [part] })
    const pattern = new design({ layout: { stacks: { test: { flipX: true } } } })
    const props = pattern.draft().getRenderProps()
    // FIXME: Add assertions here
    //expect(pattern.__isStackHidden('test')).to.equal(false)
  })
})
