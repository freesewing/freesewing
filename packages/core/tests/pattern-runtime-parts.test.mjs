import chai from 'chai'
import { Design } from '../src/index.mjs'
import sinon from 'sinon'

const expect = chai.expect

describe('Pattern', () => {
  describe('.addPart()', () => {
    const part1 = {
      name: 'test',
      draft: ({ part }) => part,
    }

    const part2 = {
      name: 'test2',
      after: part1,
      draft: ({ part }) => part,
    }

    const part3 = {
      name: 'test3',
      from: part2,
      draft: ({ part }) => part,
    }

    describe('with resolveImmediately: true', () => {
      it('Should add the part to parts object', () => {
        const design = new Design({ parts: [part1] })
        const pattern = new design()
        pattern.__init()
        pattern.addPart(part2, true)
        expect(pattern.config.parts.test2).to.equal(part2)
      })

      it('Should resolve injected dependencies for the new part', () => {
        const design = new Design({ parts: [part1] })
        const pattern = new design()
        pattern.__init()
        pattern.addPart(part3, true)
        expect(pattern.config.inject.test3).to.equal('test2')
      })

      it('Should resolve all dependencies for the new part', () => {
        const design = new Design({ parts: [part1] })
        const pattern = new design()
        pattern.__init()
        pattern.addPart(part3, true)
        expect(pattern.config.resolvedDependencies.test3).to.have.members(['test', 'test2'])
        expect(pattern.config.parts.test2).to.equal(part2)
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

      it('Should resolve the options for the new part', () => {
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

      it('Should resolve the dependency options for the new part', () => {
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

        const part3 = {
          name: 'test3',
          from: part2,
          draft: ({ part }) => part,
        }

        pattern.addPart(part3, true)
        expect(pattern.config.options.opt1).to.equal(opt1)
      })

      it('Should resolve the overwritten options for the new part', () => {
        const design = new Design({ parts: [part1] })
        const pattern = new design()
        pattern.__init()

        const opt1 = { pct: 10, min: 0, max: 50 }
        const part2 = {
          name: 'test2',
          options: {
            opt1: { pct: 15, min: 10, max: 55 },
          },
          draft: ({ part }) => part,
        }

        const part3 = {
          name: 'test3',
          from: part2,
          options: {
            opt1,
          },
          draft: ({ part }) => part,
        }

        pattern.addPart(part3, true)
        expect(pattern.config.options.opt1).to.equal(opt1)
      })

      describe('during drafting', () => {
        it('adds the part to the draft queue', () => {
          const design = new Design({ parts: [part1] })
          const pattern = new design()
          pattern.use({
            name: 'draftTimePartPlugin',
            hooks: {
              postPartDraft: (pattern) => {
                const newPart = {
                  name: 'newPartTest',
                  draft: ({ part }) => part,
                }

                pattern.addPart(newPart)
              },
            },
          })

          pattern.draft()
          expect(pattern.draftQueue.contains('newPartTest')).to.be.true
        })
        it('drafts the part', () => {
          const design = new Design({ parts: [part1] })
          const pattern = new design()
          const part2Draft = ({ part }) => part
          const draftSpy = sinon.spy(part2Draft)
          pattern.use({
            name: 'draftTimePartPlugin',
            hooks: {
              postPartDraft: (pattern) => {
                const newPart = {
                  name: 'newPartTest',
                  draft: draftSpy,
                }

                pattern.addPart(newPart)
              },
            },
          })

          pattern.draft()
          expect(draftSpy.calledOnce).to.be.true
        })
      })
    })

    describe('with resolveImmediately: false', () => {
      it('does not create duplications in the configuration')
    })
  })
})
