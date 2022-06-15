export function createTeeth(path, largeTeeth, smallTeeth, numberOfTeeth, aggressive, newPath) {
  let c = 0.55191502449351

  let pLength = path.length()
  let stepLength = pLength / numberOfTeeth

  let teethStep = (largeTeeth - smallTeeth) / (numberOfTeeth / 2 - 1)
  let teethDirection = 1

  let teethSize = smallTeeth
  for (var i = 0; i < numberOfTeeth; i++) {
    if (i == numberOfTeeth / 2) teethDirection = 0
    if (i > numberOfTeeth / 2) teethDirection = -1

    teethSize += teethStep * teethDirection
    let startP = path.shiftAlong(stepLength * i)
    let midP = path.shiftAlong(stepLength * (i + 0.5))
    let endP = path.shiftAlong(stepLength * (i + 1))
    let midPangle = midP.angle(path.shiftAlong(stepLength * (i + 0.5) + 0.1)) + 90
    midP = midP.shift(midPangle, teethSize)
    let startPcp = startP.shift(
      startP.angle(path.shiftAlong(stepLength * i + 0.1)) + 90,
      teethSize * c
    )
    let endPcp = endP.shift(
      endP.angle(path.shiftAlong(stepLength * (i + 1) - 0.1)) - 90,
      teethSize * c
    )
    let midPcp1 = midP.shift(midPangle - 90, stepLength * c * (aggressive ? 0.05 : 0.7))
    let midPcp2 = midP.shift(midPangle + 90, stepLength * c * (aggressive ? 0.05 : 0.7))

    newPath.curve(startPcp, midPcp2, midP)
    newPath.curve(midPcp1, endPcp, endP)
  }

  return
}
