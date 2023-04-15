import chai from 'chai'
import { Design } from '@freesewing/core'
import { plugin } from '../src/index.mjs'

const expect = chai.expect

describe('Cutlist Plugin Tests', () => {
  it('Draft method should receive added methods', () => {
    let methods
    const part = {
      name: 'example_part',
      draft: ({ store, part }) => {
        methods = { ...store.cutlist }

        return part
      },
      plugins: [plugin],
    }
    const Test = new Design({ parts: [part] })
    const pattern = new Test()
    pattern.draft()
    expect(methods.addCut).to.be.a('function')
    expect(methods.removeCut).to.be.a('function')
    expect(methods.setGrain).to.be.a('function')
    expect(methods.setCutOnFold).to.be.a('function')
  })

  it('Should handle addCut() with defaults', () => {
    const part = {
      name: 'example_part',
      draft: ({ store, part }) => {
        store.cutlist.addCut()

        return part
      },
      plugins: [plugin],
    }
    const Test = new Design({ parts: [part] })
    const pattern = new Test()
    pattern.draft()
    expect(pattern.setStores[0].cutlist.example_part.materials.fabric).to.have.lengthOf(1)
    expect(pattern.setStores[0].cutlist.example_part.materials.fabric[0]).to.deep.equal({
      cut: 2,
      identical: false,
      bias: false,
      ignoreOnFold: false,
    })
  })

  it('Should handle addCut() with non-defaults', () => {
    const part = {
      name: 'example_part',
      draft: ({ store, part }) => {
        store.cutlist.addCut({ cut: 3, material: 'lining', identical: true })

        return part
      },
      plugins: [plugin],
    }
    const Test = new Design({ parts: [part] })
    const pattern = new Test()
    pattern.draft()
    expect(pattern.setStores[0].cutlist.example_part.materials.lining).to.have.lengthOf(1)
    expect(pattern.setStores[0].cutlist.example_part.materials.lining[0]).to.deep.equal({
      cut: 3,
      identical: true,
      bias: false,
      ignoreOnFold: false,
    })
  })

  it('Should remove cut info via addCut(false)', () => {
    const part = {
      name: 'example_part',
      draft: ({ store, part }) => {
        store.cutlist.addCut(2, 'fabric')
        store.cutlist.addCut(4, 'lining', true)
        store.cutlist.addCut(false, 'lining')

        return part
      },
      plugins: [plugin],
    }
    const Test = new Design({ parts: [part] })
    const pattern = new Test()
    pattern.draft()
    expect(pattern.setStores[0].cutlist.example_part.materials.lining).to.be.undefined
  })

  it('Should remove cut info for a material via removeCut()', () => {
    const part = {
      name: 'example_part',
      draft: ({ store, part }) => {
        store.cutlist.addCut(2, 'fabric')
        store.cutlist.addCut(4, 'lining', true)
        store.cutlist.removeCut('lining')

        return part
      },
      plugins: [plugin],
    }
    const Test = new Design({ parts: [part] })
    const pattern = new Test()
    pattern.draft()
    expect(pattern.setStores[0].cutlist.example_part.materials.lining).to.be.undefined
    expect(pattern.setStores[0].cutlist.example_part.materials.fabric[0].cut).to.equal(2)
  })

  it('Should remove cut info for all materials via removeCut(true)', () => {
    const part = {
      name: 'example_part',
      draft: ({ store, part }) => {
        store.cutlist.addCut(2, 'fabric')
        store.cutlist.addCut(4, 'lining', true)
        store.cutlist.removeCut()

        return part
      },
      plugins: [plugin],
    }
    const Test = new Design({ parts: [part] })
    const pattern = new Test()
    pattern.draft()
    expect(pattern.setStores[0].cutlist.example_part.materials).to.be.undefined
  })

  it('Should set the grain via setGrain()', () => {
    const part = {
      name: 'example_part',
      draft: ({ store, part }) => {
        store.cutlist.setGrain(45)

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
      draft: ({ store, part }) => {
        store.cutlist.setGrain(45)
        store.cutlist.setGrain(false)

        return part
      },
      plugins: [plugin],
    }
    const Test = new Design({ parts: [part] })
    const pattern = new Test()
    pattern.draft()
    expect(pattern.setStores[0].cutlist.example_part.grain).to.be.undefined
  })

  it('Should set the cutOnFold via setCutOnFold(p1, p2)', () => {
    const part = {
      name: 'example_part',
      draft: ({ Point, store, part }) => {
        try {
          store.cutlist.setCutOnFold(new Point(2, 2), new Point(200, 200))
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
      draft: ({ Point, store, part }) => {
        try {
          store.cutlist.setCutOnFold(new Point(2, 2), new Point(200, 200))
          store.cutlist.setCutOnFold(false)
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
    expect(pattern.setStores[0].cutlist.example_part.cutOnFold).to.be.undefined
  })
})
