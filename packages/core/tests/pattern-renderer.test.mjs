import chai from 'chai'
import { Design } from '../src/index.mjs'

const expect = chai.expect

describe('Pattern Rendering', () => {
  describe('Pattern.prototype.getRenderProps()', () => {
    describe('Hidden parts and stacks', () => {
      const part = {
        name: 'test',
        draft: ({ part }) => {
          part.hide()
          return part
        },
      }

      const design = new Design({ parts: [part] })
      const pattern = new design({}).draft()
      const props = pattern.getRenderProps()
      const logs = pattern.getLogs()

      it('Should not include hidden stacks', () => {
        expect(props.stacks).not.to.have.property('test')
      })
      it('Should log that it has skipped a hidden stack', () => {
        expect(logs.pattern.info).to.include('Stack test is hidden. Skipping in render props.')
      })
    })
  })
})
