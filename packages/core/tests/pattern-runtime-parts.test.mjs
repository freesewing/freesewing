import chai from 'chai'
import { Design } from '../src/index.mjs'

const expect = chai.expect

describe('Pattern', () => {
  describe('.addPart()', () => {
    const part1 = {
      name: 'test',
      draft: ({ part }) => part,
    }

    const part2 = {
      name: 'test2',
      from: part1,
      draft: ({ part }) => part,
    }

    const part3 = {
      name: 'test3',
      after: part2,
      draft: ({ part }) => part,
    }

    describe('with resolveImmediately: true', () => {
      it('Should add the part to the internal part object', () => {
        const design = new Design({ parts: [part1] })
        const pattern = new design()
        pattern.__init()
        pattern.addPart(part2, true)
        expect(pattern.__designParts.test2).to.equal(part2)
      })

      it('Should resolve injected dependencies for the new part', () => {
        const design = new Design({ parts: [part1] })
        const pattern = new design()
        pattern.__init()
        pattern.addPart(part2, true)
        expect(pattern.__inject.test2).to.equal('test')
      })

      it('Should resolve all dependencies for the new part', () => {
        const design = new Design({ parts: [part1] })
        const pattern = new design()
        pattern.__init()
        pattern.addPart(part3, true)
        expect(pattern.config.resolvedDependencies.test3).to.have.members(['test', 'test2'])
        expect(pattern.__designParts.test2).to.equal(part2)
      })

      it('Should add a the measurements for the new part', () => {
        const design = new Design({ parts: [part1] })
        const pattern = new design()
        pattern.__init()

        const part2 = {
          name: 'test2',
          measurements: ['neck'],
          draft: ({ part }) => part,
        }

        pattern.addPart(part2, true)
        expect(pattern.config.measurements).to.include('neck')
      })

      it('Should add the plugins for the new part', () => {
        const design = new Design({ parts: [part1] })
        const pattern = new design()
        pattern.__init()

        const plugin = { name: 'testPlugin' }
        const part2 = {
          name: 'test2',
          plugins: [plugin],
          draft: ({ part }) => part,
        }

        pattern.addPart(part2, true)
        expect(pattern.config.plugins.testPlugin).to.equal(plugin)
      })

      it('Should add the options for the new part', () => {
        const design = new Design({ parts: [part1] })
        const pattern = new design()
        pattern.__init()

        const opt1 = { pct: 10, min: 0, max: 50 }
        const part2 = {
          name: 'test2',
          options: {
            opt1,
          },
          draft: ({ part }) => part,
        }

        pattern.addPart(part2, true)
        expect(pattern.config.options.opt1).to.equal(opt1)
      })
    })
  })
})
