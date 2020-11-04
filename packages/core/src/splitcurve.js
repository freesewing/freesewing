import Path from './path'

/** Splits a curve on a point */
export default function splitCurve(start, cp1, cp2, end, split) {
  let [c1, c2] = new Path().move(start).curve(cp1, cp2, end).split(split)

  return [
    {
      start: c1.ops[0].to,
      cp1: c1.ops[1].cp1,
      cp2: c1.ops[1].cp2,
      end: c1.ops[1].to
    },
    {
      start: c2.ops[0].to,
      cp1: c2.ops[1].cp1,
      cp2: c2.ops[1].cp2,
      end: c2.ops[1].to
    }
  ]
}
