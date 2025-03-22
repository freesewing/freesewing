import { expect } from 'chai'
import { Bezier } from '../src/bezier.mjs'

describe('BezierJS', () => {
  it('Should find intersections for paths that fail in upstream BezierJS', () => {
    const tt1 = new Bezier(
      20.294698715209961,
      20.116849899291992,
      26.718513488769531,
      28.516490936279297,
      33.345268249511719,
      37.4105110168457,
      36.240531921386719,
      37.736736297607422
    )
    const tt2 = new Bezier(
      43.967803955078125,
      30.767040252685547,
      43.967803955078125,
      31.771089553833008,
      35.013500213623047,
      32.585041046142578,
      23.967803955078125,
      32.585041046142578
    )

    const intersections = tt1.intersects(tt2)
    expect(intersections.length).toEqual(2)

    const ttReduced = tt1.reduce()
    expect(ttReduced.length).toEqual(4)
  })
})
