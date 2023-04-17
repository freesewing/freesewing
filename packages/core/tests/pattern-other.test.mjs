import chai from 'chai'
import { Design } from '../src/index.mjs'

const expect = chai.expect

describe('Pattern', () => {
  it('Should log an error when a part does not have a name', () => {
    const part = { draft: ({ part }) => part }
    const design = new Design()
    const pattern = new design()
    pattern.addPart(part)
    expect(pattern.store.logs.error.length).to.equal(1)
    expect(pattern.store.logs.error[0]).to.equal('Part must have a name')
  })

  it('Should log an error when a part does not have a draft method', () => {
    const from = {
      name: 'test',
      noDraft: ({ points, part }) => {
        points.test = false
        return part
      },
    }
    const to = {
      name: 'testTo',
      from,
      draft: ({ part }) => part,
    }
    const design = new Design({ parts: [to] })
    const pattern = new design()
    pattern.draft()
    expect(pattern.setStores[0].logs.error.length).to.equal(1)
    expect(pattern.setStores[0].logs.error[0]).to.equal(
      'Unable to draft pattern part __test__. Part.draft() is not callable'
    )
  })

  it('Not returning the part from the draft method should log an error', () => {
    const test = {
      name: 'test',
      draft: () => {},
    }
    const design = new Design({ parts: [test] })
    const pattern = new design()
    pattern.draft()
    expect(pattern.setStores[0].logs.error.length).to.equal(1)
    expect(pattern.setStores[0].logs.error[0]).to.equal(
      'Result of drafting part test was undefined. Did you forget to return the part?'
    )
  })

  it('Should skip unneeded parts', () => {
    const test = {
      name: 'test',
      draft: ({ part }) => part,
    }
    const you = {
      name: 'you',
      draft: ({ part }) => part,
    }
    const design = new Design({ parts: [test, you] })
    const pattern = new design({ only: ['you'] })
    pattern.draft()
    expect(pattern.setStores[0].logs.debug).to.include('Part `test` is not needed. Skipping part')
  })

  it('Should return the initialized config', () => {
    const test = {
      name: 'test',
      draft: ({ part }) => part,
    }
    const design = new Design({ parts: [test] })
    const pattern = new design({ only: ['you'] })
    const config = pattern.getConfig()
    expect(config.draftOrder.length).to.equal(1)
    expect(config.draftOrder[0]).to.equal('test')
  })

  it('Should skip a plugin that is loaded twice', () => {
    const test = {
      name: 'test',
      draft: ({ part }) => part,
    }
    const plugin = { name: 'test' }
    const design = new Design({ parts: [test] })
    const pattern = new design({ only: ['you'] })
    pattern.use(plugin)
    pattern.use(plugin)
    pattern.use({ plugin })
    pattern.use({ plugin })
    expect(Object.keys(pattern.plugins.plugins)).to.have.lengthOf(1)
    expect(Object.keys(pattern.plugins.plugins)[0]).to.equal('test')
  })

  it('Should log an error of added parts do not have a draft method', () => {
    const design = new Design()
    const pattern = new design()
    pattern.addPart({})
    expect(pattern.store.logs.error.length).to.equal(1)
    expect(pattern.store.logs.error[0]).to.equal('Part must have a draft() method')
  })

  it('Parts in only are never hidden', () => {
    const test = {
      name: 'test',
      hidden: true,
      draft: ({ part }) => part,
    }
    const design = new Design({ parts: [test] })
    const pattern = new design({ only: ['test'] })
    pattern.__init()
    expect(pattern.__isPartHidden('test')).to.equal(false)
  })

  it('Stacks with parts in only are never hidden', () => {
    const part = {
      name: 'test',
      draft: ({ points, Point, part }) => {
        points.test = new Point(3, 3)

        return part
      },
    }
    const design = new Design({ parts: [part] })
    const pattern = new design({ only: ['test'] })
    pattern.draft().render()
    expect(pattern.__isStackHidden('test')).to.equal(false)
  })

  it('Stacks with parts in only are never hidden', () => {
    const part = {
      name: 'test',
      draft: ({ points, Point, part }) => {
        points.test = new Point(3, 3)

        return part
      },
    }
    const design = new Design({ parts: [part] })
    const pattern = new design({ only: ['test'] })
    pattern.draft().render()
    expect(pattern.__isStackHidden('test')).to.equal(false)
  })

  it('Drafts with errors should not get packed', () => {
    const part = {
      name: 'test',
      draft: ({ points, Point, part }) => {
        points.test = new Point(3, 3)
        joints.foo = 'bar' // eslint-disable-line no-undef

        return part
      },
    }
    const design = new Design({ parts: [part] })
    const pattern = new design()
    pattern.draft().render()
    expect(pattern.setStores[0].logs.error.length).to.equal(1)
    expect(pattern.setStores[0].logs.error[0][0]).to.equal('Unable to draft part `test` (set 0)')
  })

  // FIXME: Add assertions here
  it('Handle layout object', () => {
    const part = {
      name: 'test',
      draft: ({ points, Point, part }) => {
        points.test = new Point(3, 3)

        return part
      },
    }
    const design = new Design({ parts: [part] })
    const pattern = new design({
      layout: { stacks: { test: { flipX: true } }, width: 300, height: 400 },
    })
    const props = pattern.draft().getRenderProps()
    expect(props.stacks.test.attributes.get('transform')).to.equal('scale(-1 1)')
    expect(props.width).to.equal(300)
    expect(props.height).to.equal(400)
  })
})
