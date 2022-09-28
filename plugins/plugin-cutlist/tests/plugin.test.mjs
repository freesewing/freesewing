import chai from 'chai'
import { Design } from '@freesewing/core'
import { plugin } from '../src/index.mjs'

const expect = chai.expect

describe('Cutlist Plugin Tests', () => {
  it('Draft method should receive added methods', () => {
    let methods
    const part = {
      name: 'example_part',
      draft: ({ addCut, removeCut, setGrain, setCutOnFold, part }) => {
        methods = { addCut, removeCut, setGrain, setCutOnFold }

        return part
      },
      plugins: [plugin],
    }
    const Test = new Design({ parts: [part] })
    const pattern = new Test()
    pattern.draft()
    expect(typeof methods.addCut).to.equal('function')
    expect(typeof methods.removeCut).to.equal('function')
    expect(typeof methods.setGrain).to.equal('function')
    expect(typeof methods.setCutOnFold).to.equal('function')
  })

  it('Should handle addCut() with defaults', () => {
    const part = {
      name: 'example_part',
      draft: ({ addCut, part }) => {
        addCut()

        return part
      },
      plugins: [plugin],
    }
    const Test = new Design({ parts: [part] })
    const pattern = new Test()
    pattern.draft()
    expect(pattern.setStores[0].cutlist.example_part.materials.fabric.cut).to.equal(2)
    expect(pattern.setStores[0].cutlist.example_part.materials.fabric.identical).to.equal(false)
  })

  it('Should handle addCut() with non-defaults', () => {
    const part = {
      name: 'example_part',
      draft: ({ addCut, part }) => {
        addCut(3, 'lining', true)

        return part
      },
      plugins: [plugin],
    }
    const Test = new Design({ parts: [part] })
    const pattern = new Test()
    pattern.draft()
    expect(pattern.setStores[0].cutlist.example_part.materials.lining.cut).to.equal(3)
    expect(pattern.setStores[0].cutlist.example_part.materials.lining.identical).to.equal(true)
  })

  it('Should remove cut info via addCut(false)', () => {
    const part = {
      name: 'example_part',
      draft: ({ addCut, part }) => {
        addCut(2, 'fabric')
        addCut(4, 'lining', true)
        addCut(false, 'lining')

        return part
      },
      plugins: [plugin],
    }
    const Test = new Design({ parts: [part] })
    const pattern = new Test()
    pattern.draft()
    expect(typeof pattern.setStores[0].cutlist.example_part.materials.lining).to.equal('undefined')
  })

  it('Should remove cut info for a material via removeCut()', () => {
    const part = {
      name: 'example_part',
      draft: ({ addCut, removeCut, part }) => {
        addCut(2, 'fabric')
        addCut(4, 'lining', true)
        removeCut('lining')

        return part
      },
      plugins: [plugin],
    }
    const Test = new Design({ parts: [part] })
    const pattern = new Test()
    pattern.draft()
    expect(typeof pattern.setStores[0].cutlist.example_part.materials.lining).to.equal('undefined')
    expect(pattern.setStores[0].cutlist.example_part.materials.fabric.cut).to.equal(2)
  })

  it('Should remove cut info for all materials via removeCut(true)', () => {
    const part = {
      name: 'example_part',
      draft: ({ addCut, removeCut, part }) => {
        addCut(2, 'fabric')
        addCut(4, 'lining', true)
        removeCut()

        return part
      },
      plugins: [plugin],
    }
    const Test = new Design({ parts: [part] })
    const pattern = new Test()
    pattern.draft()
    expect(typeof pattern.setStores[0].cutlist.example_part.materials).to.equal('undefined')
  })

  it('Should set the grain via setGrain()', () => {
    const part = {
      name: 'example_part',
      draft: ({ setGrain, part }) => {
        setGrain(45)

        return part
      },
      plugins: [plugin],
    }
    const Test = new Design({ parts: [part] })
    const pattern = new Test()
    pattern.draft()
    expect(pattern.setStores[0].cutlist.example_part.grain).to.equal(45)
  })

  it('Should remove the grain via setGrain(false)', () => {
    const part = {
      name: 'example_part',
      draft: ({ setGrain, part }) => {
        setGrain(45)
        setGrain(false)

        return part
      },
      plugins: [plugin],
    }
    const Test = new Design({ parts: [part] })
    const pattern = new Test()
    pattern.draft()
    expect(typeof pattern.setStores[0].cutlist.example_part.grain).to.equal('undefined')
  })

  it('Should set the cutOnFold via setCutOnFold(p1, p2)', () => {
    const part = {
      name: 'example_part',
      draft: ({ Point, setCutOnFold, part }) => {
        try {
          setCutOnFold(new Point(2, 2), new Point(200, 200))
        } catch (err) {
          console.log(err)
        }

        return part
      },
      plugins: [plugin],
    }
    const Test = new Design({ parts: [part] })
    const pattern = new Test()
    pattern.draft()
    expect(pattern.setStores[0].cutlist.example_part.cutOnFold[0].x).to.equal(2)
    expect(pattern.setStores[0].cutlist.example_part.cutOnFold[0].y).to.equal(2)
    expect(pattern.setStores[0].cutlist.example_part.cutOnFold[1].x).to.equal(200)
    expect(pattern.setStores[0].cutlist.example_part.cutOnFold[1].y).to.equal(200)
  })

  it('Should removet the cutOnFold via setCutOnFold(false)', () => {
    const part = {
      name: 'example_part',
      draft: ({ Point, setCutOnFold, part }) => {
        try {
          setCutOnFold(new Point(2, 2), new Point(200, 200))
          setCutOnFold(false)
        } catch (err) {
          console.log(err)
        }

        return part
      },
      plugins: [plugin],
    }
    const Test = new Design({ parts: [part] })
    const pattern = new Test()
    pattern.draft()
    expect(typeof pattern.setStores[0].cutlist.example_part.cutOnFold).to.equal('undefined')
  })
})
